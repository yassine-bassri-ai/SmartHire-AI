from pathlib import Path
import pandas as pd
from src.preprocessing.preprocessing_pipeline import preprocess_text
from src.information_extraction.parser import parse_cv
from src.job_parser.parser import parse_job
from src.machine_learning.feature_engineering import extract_features
from src.machine_learning.utils import compute_final_score


def build_dataset(
    input_csv: Path,
    output_csv: Path
):

    print("=" * 60)
    print("Construction du dataset Machine Learning...")
    print("=" * 60)

    df = pd.read_csv(input_csv)

    rows = []

    total = len(df)

    for index, row in df.iterrows():

        try:

            resume = str(row["Resume"])
            job_description = str(row["Job Description"])
            label = int(row["Best Match"])

            # -----------------------------
            # Prétraitement NLP
            # -----------------------------

            resume_result = preprocess_text(resume)
            job_result = preprocess_text(job_description)

            resume_clean = resume_result["processed_text"]
            job_clean = job_result["processed_text"]

            language = resume_result["language"]

            # -----------------------------
            # Parsing
            # -----------------------------

            cv_json = parse_cv(
                text=resume_clean,
                filename=f"resume_{index}",
                language=language
            )

            job_json = parse_job(
                job_title=row["Job Roles"],
                description=job_clean
            )
           
            # -----------------------------
            # Feature Engineering
            # -----------------------------

            features = extract_features(
                cv_json,
                job_json
            )

            final_score = compute_final_score(
                features
            )

            rows.append({

                "resume_id": index,

                "job_title": row["Job Roles"],

                "skill_score":
                    features["skill_score"],

                "education_score":
                    features["education_score"],

                "experience_score":
                    features["experience_score"],

                "language_score":
                    features["language_score"],

                "certification_score":
                    features["certification_score"],

                "final_score":
                    final_score,

                "best_match":
                    label

            })

            print(f"{index+1}/{total}")

        except Exception as e:

            print(f"Erreur ligne {index}")

            print(e)

    dataset = pd.DataFrame(rows)

    output_csv.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    dataset.to_csv(
        output_csv,
        index=False
    )

    print()

    print("=" * 60)
    print("Dataset créé avec succès.")
    print(output_csv)
    print(f"Lignes : {len(dataset)}")
    print("=" * 60)