from pathlib import Path

import pandas as pd

from src.job_processing.job_preprocessing import (
    preprocess_job_description
)


def preprocess_job_dataset(input_file: Path,
                           output_file: Path):

    df = pd.read_csv(input_file)

    print(f"{len(df)} offres trouvées.")

    cleaned_jobs = []

    for i, description in enumerate(df["Job Description"]):

        clean_text = preprocess_job_description(description)

        cleaned_jobs.append(clean_text)

        print(f"Traitement : {i+1}/{len(df)}")

    df["Clean_Job_Description"] = cleaned_jobs

    output_file.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    df.to_csv(
        output_file,
        index=False,
        encoding="utf-8"
    )

    print("\nPrétraitement terminé.")

    print(output_file)