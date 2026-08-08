import json

from pathlib import Path

import pandas as pd

from src.matching.feature_engineering.feature_builder import (
    build_features
)

from sklearn.metrics.pairwise import cosine_similarity

from src.embeddings.embedding_loader import (
    EmbeddingLoader
)

def load_json_folder(folder):

    folder = Path(folder)

    data = []

    # Recherche récursive dans tous les sous-dossiers
    json_files = list(folder.rglob("*.json"))

    print(f"{len(json_files)} fichiers trouvés dans {folder}")

    for file in json_files:

        with open(file, encoding="utf-8") as f:

            item = json.load(f)

        item["id"] = file.stem

        data.append(item)

    return data


def build_dataset(

    resumes_folder,

    jobs_folder,

    output_csv

):
    resumes = load_json_folder(resumes_folder)
    jobs = load_json_folder(jobs_folder)

    print(f"\nCV trouvés : {len(resumes)}")
    print(f"Jobs trouvés : {len(jobs)}\n")
    rows = []

    total = len(resumes) * len(jobs)

    current = 0

    cv_loader = EmbeddingLoader(
        "artifacts/embeddings/cv_embeddings.pkl"
    )

    job_loader = EmbeddingLoader(
        "artifacts/embeddings/job_embeddings.pkl"
    )

    for resume in resumes:

        for job in jobs:

            current += 1

            print(

                f"{current}/{total}",

                end="\r"

            )

            features = build_features(
                resume,
                job
            )

            resume_embedding = cv_loader.get(
                resume["id"]
            )

            job_embedding = job_loader.get(
                job["id"]
            )

            semantic_similarity = cosine_similarity(

                [resume_embedding],

                [job_embedding]

            )[0][0]

            features["semantic_similarity"] = round(

                float(semantic_similarity),

                4

            )
            row = {

                "resume_id":

                resume["id"],

                "job_id":

                job["id"]

            }

            row.update(features)

            rows.append(row)

    df = pd.DataFrame(rows)

    Path(output_csv).parent.mkdir(

        parents=True,

        exist_ok=True

    )

    df.to_csv(

        output_csv,

        index=False

    )

    print()

    print(df.shape)

    print()

    print("Dataset créé.")