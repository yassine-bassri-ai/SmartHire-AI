import json
from pathlib import Path

from src.database.job_repository import JobRepository


class JobService:

    def __init__(self):

        self.repository = JobRepository()

    def parse_job(self, json_path: str):

        json_path = Path(json_path)

        with open(json_path, "r", encoding="utf-8") as f:

            job = json.load(f)

        # Génération d'un identifiant si absent
        if "job_id" not in job:

            job["job_id"] = json_path.stem

        # Valeurs par défaut
        title = job.get("job_title", job.get("title", "Unknown Job"))

        company = job.get("company", "Unknown")

        language = job.get("language", "en")

        experience = job.get("experience_years", 0)

        if not self.repository.exists(job["job_id"]):
            self.repository.insert(
                job_id=job["job_id"],
                title=title,
                company=company,
                language=language,
                experience=experience
            )

        return job

    def parse_all_jobs(self, folder_path: str):

        folder = Path(folder_path)

        inserted = 0

        for json_file in folder.glob("*.json"):

            self.parse_job(str(json_file))

            inserted += 1

        return inserted
