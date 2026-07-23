from pathlib import Path
import sys
from src.machine_learning.dataset_builder import build_dataset

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

build_dataset(

    input_csv=PROJECT_ROOT /
    "data/raw/resumes/job_applicant_dataset.csv",

    output_csv=PROJECT_ROOT /
    "data/processed/machine_learning/matching_dataset.csv"

)