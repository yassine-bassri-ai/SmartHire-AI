from src.embeddings.generate_job_embeddings import (
    generate_job_embeddings
)

generate_job_embeddings(

    "data/processed/parsed_jobs",

    "artifacts/embeddings/job_embeddings.pkl"

)