import joblib

import pandas as pd

from pathlib import Path

from sklearn.metrics.pairwise import cosine_similarity

from src.database.job_repository import JobRepository
from src.database.prediction_repository import PredictionRepository

from src.database.resume_repository import ResumeRepository

from src.matching.feature_engineering.feature_builder import (
    build_features
)

from src.embeddings.embedding_loader import EmbeddingLoader

import numpy as np 
class PredictionService:

    def __init__(self):

        model_path = Path("artifacts/models/best_model.pkl").resolve()
        scaler_path = Path("artifacts/models/scaler.pkl").resolve()

        print("=" * 80)
        print("MODEL PATH :", model_path)
        print("SCALER PATH:", scaler_path)

        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)


        self.resume_repository = ResumeRepository()

        self.job_repository = JobRepository()

        self.prediction_repository = PredictionRepository()


        if hasattr(self.scaler, 'feature_names_in_'):
            self.feature_columns = list(self.scaler.feature_names_in_)
        else:
            # Fallback si le scaler est ancien et n'a pas feature_names_in_
            raise AttributeError(
                "Le scaler n'a pas d'attribut 'feature_names_in_'. "
                "Tu dois définir manuellement self.feature_columns = [...] "
                "avec les colonnes exactes utilisées lors de l'entraînement."
            )
    
        

        self.cv_embeddings = EmbeddingLoader(

            "artifacts/embeddings/cv_embeddings.pkl"

        )

        self.job_embeddings = EmbeddingLoader(

            "artifacts/embeddings/job_embeddings.pkl"

        )
    

    def predict(self, resume_json):

        print("START PREDICTION")

        jobs = self.job_repository.get_all()[:30]
        print("Jobs loaded :", len(jobs))

        for i, job in enumerate(jobs):
            print(f"Processing job {i+1}/{len(jobs)}")

        self.prediction_repository.delete_resume_predictions(

            resume_json["database_id"]
        )


        predictions = []

        for job in jobs:
            print("Building features...")
            features = build_features(resume_json, job)

            # ==========================
            # Embedding
            # ==========================

            job_id = job.get("id")

            print("Loading embeddings...")

            resume_embedding = self.cv_embeddings.get(resume_json["filename"])

            job_embedding_key = job.get("job_id")

            if job_embedding_key is None:
                job_embedding_key = f"job_{int(job_id):04d}"

            job_embedding = self.job_embeddings.get(job_embedding_key)

            if resume_embedding is None or job_embedding is None:
                print(f"Embedding manquant : {job_embedding_key}")
                continue

            semantic_similarity = cosine_similarity(
                np.array(resume_embedding).reshape(1, -1),
                np.array(job_embedding).reshape(1, -1)
            )[0][0]

            features["semantic_similarity"] = float(semantic_similarity)

            # ==========================
            # Diagnostic
            # ==========================
        
            missing = sorted(set(self.feature_columns) - set(features.keys()))
            extra = sorted(set(features.keys()) - set(self.feature_columns))

            # construire le dataframe

            X = pd.DataFrame([features])

            # ajouter les colonnes manquantes

            for col in self.feature_columns:
                if col not in X.columns:
                    X[col] = 0

            # conserver uniquement les colonnes du scaler

            X = X[self.feature_columns]

            X = X.fillna(0)

            print("Scaling...")
           
            X_scaled = self.scaler.transform(X)


            if X_scaled.shape[1] != self.model.n_features_in_:
                raise ValueError(
                    f"Incohérence détectée : "
                    f"le modèle attend {self.model.n_features_in_} features "
                    f"mais le scaler fournit {X_scaled.shape[1]}."
                )


            print("Predicting...")
            probability = float(self.model.predict_proba(X_scaled)[0][1])
            prediction = int(self.model.predict(X_scaled)[0])
            score = round(probability * 100, 2)
            
            self.prediction_repository.insert(
                resume_json["database_id"],
                job_id,  # ✅ Utiliser la variable validée
                prediction,
                probability
            )

            predictions.append({
                "job_id": job_id,  # ✅ Cohérent
                "job_title": job["job_title"],
                "prediction": prediction,
                "probability": probability,
                "score": score
            })

        predictions.sort(

            key=lambda x: x["probability"],

            reverse=True

        )

        return predictions[:10]

    def rank_candidate(self, resume_id: int, limit: int = 10):
        """
        Classe les offres correspondant à un CV
        selon leur score de prédiction.
        """

        # Récupérer les prédictions du candidat
        predictions = self.prediction_repository.get_by_resume_job(resume_id)

        if not predictions:
            return []

        # Trier par probabilité décroissante
        ranked_predictions = sorted(
            predictions,
            key=lambda x: float(x.get("probability", 0)),
            reverse=True
        )

        # Ajouter le rang
        ranked_candidates = []

        for rank, prediction in enumerate(
            ranked_predictions[:limit],
            start=1
        ):
            ranked_candidates.append({
                "rank": rank,
                "resume_id": resume_id,
                "job_id": prediction.get("job_id"),
                "job_title": prediction.get("job_title"),
                "prediction": prediction.get("prediction"),
                "probability": round(
                    float(prediction.get("probability", 0)),
                    4
                ),
                "score": round(
                    float(prediction.get("probability", 0)) * 100,
                    2
                )
            })

        return ranked_candidates
