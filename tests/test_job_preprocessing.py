from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

from src.job_processing.job_pipeline import (
    preprocess_job_dataset
)

input_file = (
    PROJECT_ROOT
    / "data"
    / "processed"
    / "job_descriptions"
    / "jobs_clean.csv"
)

output_file = (
    PROJECT_ROOT
    / "data"
    / "processed"
    / "job_descriptions"
    / "jobs_preprocessed.csv"
)

preprocess_job_dataset(
    input_file,
    output_file
)