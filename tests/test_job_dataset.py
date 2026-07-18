from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

from src.job_processing.data_loader import load_dataset
from src.job_processing.eda import dataset_info, show_job_description
from src.job_processing.data_cleaner import (
    remove_duplicates,
    remove_missing_job_description,
    remove_missing_job_title,
    remove_unused_columns
)
from src.job_processing.preprocessing import save_clean_dataset


dataset = PROJECT_ROOT / "data/raw/job_descriptions/DataAnalyst.csv"

df = load_dataset(dataset)

print("\nDataset chargé.\n")

dataset_info(df)

print("\nNettoyage...\n")

df = remove_unused_columns(df)

df = remove_duplicates(df)

df = remove_missing_job_title(df)

df = remove_missing_job_description(df)

save_clean_dataset(
    df,
    PROJECT_ROOT /
    "data/processed/job_descriptions/jobs_clean.csv"
)
show_job_description(df)
print("\nTraitement terminé.")