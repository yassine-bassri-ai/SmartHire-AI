# SMART HIRE AI — PROJECT LOG

## Jour 1 — Initialisation du projet

**Date : 12/07/2026**

### Objectif
Définir le projet et préparer l'environnement.

### Travaux réalisés
- Définition des objectifs.
- Choix des technologies.
- Création de la structure du projet.
- Initialisation de Git.

### À faire
- Recherche et analyse des jeux de données.

---

# Jour 2 et 3 — Analyse du problème, conception et sélection des datasets

**Date : 13/07/2026**

### Objectif
Identifier les besoins du projet, concevoir le pipeline global et sélectionner les jeux de données.

### Travaux réalisés
- Identification du problème ML : classification binaire (candidat compatible / non compatible).
- Définition du classement des candidats selon un score de compatibilité.
- Identification des données nécessaires : CV, offres d'emploi et données de matching.
- Analyse de plusieurs jeux de données.
- Sélection de `job_applicant_dataset.csv`.
- Analyse : 10 000 enregistrements, 9 colonnes, aucune valeur manquante.
- Colonnes utiles : Resume, Job Description, Job Roles, Best Match.
- Écart des variables susceptibles d'introduire des biais : Gender, Race, Ethnicity, Job Applicant Name.
- Sélection d'un second jeu de données de CV PDF français et anglais.

### Architecture validée
1. CV PDF
2. Extraction du texte
3. Prétraitement NLP
4. Extraction des compétences
5. Représentation numérique
6. Machine Learning / DistilBERT
7. MySQL
8. Interface applicative
9. Power BI

---

# Jour 4 — Extraction PDF et détection de langue

**Date : 14/07/2026**

### Travaux réalisés
- Intégration de PyMuPDF.
- Création de `pdf_extraction.py`.
- Extraction page par page.
- Intégration de `langdetect`.
- Création de `language_detector.py`.
- Création de `metadata_manager.py`.
- Création de `pipeline.py`.
- Génération de `data/processed/resumes_metadata.csv`.

### Métadonnées suivies
- Nom du fichier
- Langue
- Nombre de pages
- Nombre de mots
- Nombre de caractères
- Fichier texte généré
- Statut du traitement

---

# Jour 5 — Prétraitement NLP et CV Parser

**Date : 15/07/2026**

### Travaux réalisés
Création du pipeline NLP :
- `text_cleaner.py`
- `tokenizer.py`
- `stopwords_remover.py`
- `lemmatizer.py`
- `preprocessing_pipeline.py`

Création du CV Parser :
- `parser.py`
- `skill_extractor.py`
- `education_extractor.py`
- `experience_extractor.py`
- `language_extractor.py`
- `certification_extractor.py`
- `cv_parser_pipeline.py`

### Résultat
Les CV sont transformés en JSON structurés contenant notamment :
- compétences ;
- formation ;
- expérience ;
- langues ;
- certifications ;
- langue du document ;
- statut du parsing.

---

# Jour 6 — Job Parser

**Date : 17/07/2026**

### Travaux réalisés
- Analyse et nettoyage du dataset des offres.
- Développement de `job_preprocessing.py`.
- Développement de `job_pipeline.py`.
- Développement du Job Parser.
- Prétraitement de 2253 offres.
- Génération de `jobs_preprocessed.csv`.
- Génération des JSON dans `data/processed/parsed_jobs/`.

### Informations extraites
- titre ;
- compétences ;
- niveau d'études ;
- expérience ;
- langues ;
- certifications.

---

# Jour 7 — Rule-Based Matching Engine

**Date : 21/07/2026**

### Objectif
Développer la première version du moteur de matching CV ↔ Job.

### Architecture
```text
src/matching/
├── __init__.py
├── skill_matcher.py
├── education_matcher.py
├── experience_matcher.py
├── language_matcher.py
├── certification_matcher.py
├── score_calculator.py
└── matching_pipeline.py
```

### Travaux réalisés
- Skill Matcher.
- Education Matcher.
- Experience Matcher.
- Language Matcher.
- Certification Matcher.
- Score global pondéré.
- Recommandations automatiques.
- Matching de tous les CV avec les offres.

### Poids initiaux
| Critère | Poids |
|---|---:|
| Skills | 45 % |
| Education | 20 % |
| Experience | 15 % |
| Languages | 10 % |
| Certifications | 10 % |

---

# Jour 8 — Dataset Machine Learning et préparation

### Travaux réalisés
- Création de `dataset_builder.py`.
- Construction du dataset ML.
- Ajout des features de matching.
- Génération de `best_match`.
- Création de `data_loader.py`.
- Création de `dataset_validator.py`.
- Création de `data_splitter.py`.
- Création de `feature_scaler.py`.
- Train/Test Split 80/20.
- Standardisation avec `StandardScaler`.

---

# Jour 9 — Machine Learning Pipeline

### Travaux réalisés
- Création de `dataset_builder_v2.py`.
- Génération de plus de 166 000 couples CV ↔ Job.
- Feature Engineering :
  - skills ;
  - education ;
  - experience ;
  - languages ;
  - certifications ;
  - TF-IDF similarity ;
  - cosine/semantic similarity.
- Génération automatique des labels.
- Entraînement et comparaison de :
  - Logistic Regression ;
  - Decision Tree ;
  - Random Forest ;
  - SVM ;
  - XGBoost.
- Évaluation avec Accuracy, Precision, Recall, F1, ROC-AUC.
- Sélection automatique du meilleur modèle.
- Sauvegarde des modèles et du scaler.

---

# Jour 10 — FastAPI REST API

### Travaux réalisés
- Mise en place de FastAPI et Uvicorn.
- Création de l'architecture `src/api`.
- Configuration centralisée.
- Schémas Pydantic.
- Endpoints de santé.
- Endpoint de prédiction.
- Batch prediction.
- Gestion des exceptions.
- Documentation Swagger et ReDoc.
- Configuration CORS.

### Résultat
Le moteur ML est accessible via une API REST.

---

# Jour 11 — MySQL, repositories et intégration Backend

### Objectif
Connecter SmartHire AI à MySQL et persister les CV, offres et résultats.

### Travaux réalisés
- Mise en place de MySQL Community Server / MySQL Workbench.
- Création et adaptation des tables nécessaires au projet.
- Création des repositories pour les entités principales.
- Intégration des repositories avec les services FastAPI.
- Développement des routes d'import et de consultation des CV et offres.
- Mise en place du stockage des prédictions.
- Adaptation des modèles et des requêtes SQL à la structure réelle de la base.

### Problèmes rencontrés et corrigés
- Erreurs de connexion MySQL.
- Problèmes de service MySQL.
- Erreurs de colonnes inconnues.
- `resume_id` absent ou utilisé avec un mauvais nom de colonne.
- Erreurs de paramètres SQL.
- Incohérences entre les identifiants Python et les identifiants présents en base.
- Adaptation de `ResumeRepository.insert()` à la structure réelle de la table.

### Résultat
La couche de persistance MySQL est intégrée au backend FastAPI.

---

# Jour 12 — Inference / Prediction Engine

### Objectif
Construire la couche d'inférence permettant de prendre un CV réel et de produire les meilleures correspondances avec les offres.

### Travaux réalisés
- Mise en place du `PredictionService`.
- Chargement du modèle ML et du scaler.
- Génération des features nécessaires à l'inférence.
- Chargement des embeddings/features des jobs.
- Comparaison CV ↔ Job.
- Production de :
  - prediction ;
  - probability ;
  - score ;
  - job_id ;
  - job_title.
- Connexion du moteur de prédiction aux endpoints FastAPI.

### Problèmes rencontrés
- Incohérence entre `job_id` et `id`.
- Erreurs de dimension des features.
- Différence entre le nombre de features attendu par le modèle et celui fourni par le scaler.
- Gestion des jobs dont l'identifiant réel est `id`.
- Problèmes de mapping des embeddings.

### Résultat
Le moteur d'inférence retourne les meilleurs jobs pour un CV réel.

---

# Jour 13 — Candidate Ranking

### Objectif
Classer les offres selon leur compatibilité avec un CV.

### Travaux réalisés
- Création/validation de la méthode de ranking des candidats.
- Tri des prédictions par score.
- Retour des meilleurs jobs.
- Ajout du rang.
- Ajout du score et de la probabilité.
- Ajout du titre du poste.
- Test avec le CV `resume_id = 9`.

### Résultat de test
Le système retourne les 10 meilleures correspondances, par exemple :
- Quality Data Analyst
- Reporting Data Analyst
- Business/Data Analyst (FP&A)
- Data Analyst - Intex Developer
- Data Analyst Entry Level
- Data Analyst
- Market Data Reporting Analyst

Le ranking fonctionne correctement et les titres des jobs sont maintenant récupérés.

---

# Jour 14 — Job Management Frontend

### Objectif
Créer une interface web pour consulter et gérer les offres.

### Travaux réalisés
- Création de la page `Jobs.tsx`.
- Recherche par titre / entreprise.
- Filtre par langue.
- Pagination.
- Affichage des compétences.
- Affichage de l'expérience.
- Navigation vers les détails d'une offre.
- Création / utilisation de `useJobs()`, `useJob()`, `useUploadJob()` et `useDeleteJob()`.
- Création de `jobApi.ts`.

### Routes utilisées
- GET `/job`
- GET `/job/all`
- GET `/job/{id}`
- POST `/job/upload`
- POST `/job/uploads`
- DELETE `/job/{id}`

### JobService
Développement/validation de :
- `parse_job()`
- `parse_all_jobs()`

Le service lit les JSON d'offres, génère un identifiant si nécessaire et insère les informations en base.

---

# Jour 15 — Job Details et correction des données frontend

### Objectif
Afficher correctement les informations détaillées d'une offre.

### Travaux réalisés
- Création/ajustement de `JobDetails.tsx`.
- Affichage :
  - titre ;
  - entreprise ;
  - job ID ;
  - compétences ;
  - langue ;
  - expérience ;
  - description / texte brut.
- Création/utilisation de `useJob(id)`.
- Correction de `getJob(id)`.

### Problème rencontré
L'API retournait une enveloppe :

```json
{
  "success": true,
  "job": {
    "job_title": "Data Analyst",
    "company": "Celerity",
    "description": "..."
  }
}
```

alors que le frontend attendait directement l'objet job.

### Solution
Adaptation de `getJob()` pour retourner l'objet `job` contenu dans la réponse API, afin que `JobDetails.tsx` puisse utiliser directement :
- `job.job_title`
- `job.company`
- `job.description`
- etc.

### Résultat
La page Job Details affiche maintenant les données réelles provenant de FastAPI/MySQL.

---

# Jour 16 — Analytics

### Objectif
Créer une API d'analyse globale du système et préparer la visualisation des statistiques.

### Endpoint
GET `/analytics`

### Données retournées
```json
{
  "total_resumes": 69,
  "total_jobs": 2253,
  "total_predictions": 8573,
  "average_score": 13.88,
  "successful_predictions": 1192,
  "languages": [
    {"language": "en", "total": 39},
    {"language": "fr", "total": 29},
    {"language": "unknown", "total": 1}
  ],
  "top_jobs": [],
  "score_distribution": []
}
```

### Travaux réalisés
- Création de `analyticsApi.ts`.
- Définition de `AnalyticsData`.
- Connexion frontend ↔ endpoint `/analytics`.
- Préparation des statistiques :
  - nombre de CV ;
  - nombre d'offres ;
  - nombre de prédictions ;
  - score moyen ;
  - prédictions réussies ;
  - répartition des langues ;
  - jobs les plus demandés ;
  - distribution des scores.
- Correction de problèmes liés à l'affichage avec MUI Grid.

### Résultat
L'API Analytics fonctionne et retourne les statistiques globales de SmartHire AI.

---

# Jour 17 — Dashboard principal

### Objectif
Construire le tableau de bord principal de SmartHire AI.

### Travaux réalisés
- Création/ajustement de `Dashboard.tsx`.
- Connexion à l'API Analytics.
- Création de cartes KPI.
- Affichage du nombre de CV.
- Affichage du nombre d'offres.
- Affichage du nombre de prédictions.
- Affichage du score moyen.
- Visualisation de la répartition des langues.
- Visualisation de la distribution des scores.
- Affichage des jobs les plus performants / demandés.
- Adaptation de l'interface MUI et correction des problèmes liés à `Grid`.

### Résultat
Le dashboard principal permet maintenant de suivre l'activité globale de SmartHire AI.

---

# Jour 18 — Prediction Page et Ranking UI

### Objectif
Permettre à l'utilisateur de sélectionner un CV et de lancer le moteur de matching depuis l'interface web.

### Travaux réalisés
- Création/ajustement de `Prediction.tsx`.
- Sélection d'un CV.
- Bouton `Run Prediction`.
- Appel de POST `/predictions/{resume_id}`.
- Affichage des étapes de traitement :
  - extraction des features ;
  - calcul de la similarité sémantique ;
  - scoring ;
  - ranking.
- Affichage du meilleur match.
- Affichage de la liste des prédictions via `PredictionTable`.
- Ajout de la probabilité.
- Ajout du score.
- Ajout du nombre de matches.
- Gestion des états :
  - loading ;
  - aucun résultat ;
  - aucun match ;
  - résultats disponibles.
- Création/validation de `predictionApi.ts`.
- Création/validation de `usePrediction.ts`.

### Endpoints
- POST `/predictions/{resume_id}`
- GET `/predictions/{resume_id}`

### Résultat
La prédiction fonctionne depuis le frontend et retourne les jobs classés selon leur score.

### Décision
La partie XAI n'est pas incluse dans le frontend actuel afin de terminer les fonctionnalités principales du projet.

---

# Jour 19 — Upload et parsing des CV depuis le frontend

### Objectif
Finaliser le flux d'entrée utilisateur : importer un CV PDF, le parser et afficher les données extraites.

### Travaux réalisés
- Création/ajustement de `UploadResume.tsx`.
- Upload de fichiers PDF.
- Validation du type de fichier.
- Limite de taille à 5 MB.
- Drag & Drop.
- Barre de progression.
- Simulation visuelle des étapes de parsing.
- Affichage du résultat du parsing.
- Affichage des :
  - compétences ;
  - formations ;
  - années d'expérience ;
  - langues ;
  - certifications ;
  - texte brut.
- Navigation vers :
  - Run AI Matching ;
  - View Resume ;
  - Upload Another.
- Gestion des erreurs avec `react-hot-toast`.

### Résultat
Le parcours utilisateur principal est maintenant disponible :

```text
Upload CV
   ↓
Extraction / Parsing
   ↓
CV structuré
   ↓
Run AI Matching
   ↓
Predictions
   ↓
Ranking des jobs
```

---

# État actuel du projet

## Backend
- CV Parsing ✅
- NLP Pipeline ✅
- Job Parsing ✅
- Matching Rule-Based ✅
- Feature Engineering ✅
- Dataset ML ✅
- Training ML ✅
- Model Evaluation ✅
- Inference Engine ✅
- Candidate Ranking ✅
- FastAPI REST API ✅
- MySQL Integration ✅
- Analytics API ✅

## Frontend
- Upload Resume ✅
- Resume Parsing Preview ✅
- Job Management ✅
- Job Details ✅
- Candidate Ranking ✅
- Prediction Page ✅
- Analytics ✅
- Dashboard principal ✅
- XAI ⏸️ volontairement non inclus pour le moment

---

# Flux fonctionnel actuel

```text
                    SMART HIRE AI
                         │
                         ▼
                 Upload Resume PDF
                         │
                         ▼
                 CV Parsing / NLP
                         │
                         ▼
                Structured Candidate
                         │
                         ▼
                  Run Prediction
                         │
                         ▼
               Feature Generation
                         │
                         ▼
                 ML Inference
                         │
                         ▼
              CV ↔ Job Comparison
                         │
                         ▼
                  Candidate Ranking
                         │
                         ▼
              Top Matching Jobs
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
     Dashboard                      Job Details
          │
          ▼
       Analytics
```

---

# Dernières validations

### Analytics API
Validation effectuée avec :
- Total resumes : 69
- Total jobs : 2253
- Total predictions : 8573
- Average score : 13.88
- Successful predictions : 1192
- CV English : 39
- CV French : 29
- Unknown : 1

### Ranking
Validation effectuée avec `resume_id = 9`.

Le système retourne actuellement 10 meilleures correspondances avec :
- rank ;
- resume_id ;
- job_id ;
- job_title ;
- prediction ;
- probability ;
- score.

---

# Prochaine étape immédiate

Priorité avant la finalisation du projet :

1. Tester tout le parcours frontend de bout en bout.
2. Vérifier les erreurs restantes.
3. Vérifier les routes React.
4. Vérifier les endpoints FastAPI.
5. Vérifier la cohérence MySQL.
6. Finaliser le Dashboard.
7. Ajouter éventuellement les dernières améliorations UI.
8. Faire un test complet avec plusieurs CV.
9. Nettoyer le code.
10. Créer le commit Git final et pousser sur GitHub.

---

# Git — Commit recommandé

## Commit pour les dernières fonctionnalités

```bash
git add .
git commit -m "feat: complete recruitment dashboard, analytics, predictions and ranking"
git push origin main
```

## Si l'on veut un commit plus précis

```bash
git add .
git commit -m "feat: add analytics dashboard and candidate job ranking"
git push origin main
```

## Vérification avant commit

```bash
git status
git diff --stat
git log --oneline -5
```

---

# Projet — Statut global

**SmartHire AI est maintenant dans la phase de finalisation.**

Les composants essentiels sont opérationnels :

**Data → NLP → Parsing → Matching → ML → Inference → Ranking → FastAPI → MySQL → Frontend → Dashboard**

La priorité est désormais la stabilisation, les tests de bout en bout et la préparation de la version finale.
