from pathlib import Path

from src.machine_learning.dataset_builder_v2 import (
    build_dataset
)

build_dataset(

    resumes_folder=Path(

        "data/processed/parsed_CV"

    ),

    jobs_folder=Path(

        "data/processed/parsed_jobs"

    ),

    output_csv=Path(

        "data/processed/machine_learning/matching_dataset_v2.csv"

    )

)