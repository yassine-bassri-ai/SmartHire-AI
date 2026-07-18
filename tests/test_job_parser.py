from pathlib import Path
import sys
from src.job_parser.pipeline import parse_jobs

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

parse_jobs(
    PROJECT_ROOT /
    "data/processed/job_descriptions/jobs_preprocessed.csv",

    PROJECT_ROOT /
    "data/processed/parsed_jobs"
)