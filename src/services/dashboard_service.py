import json
from pathlib import Path
from collections import Counter

from src.database.dashboard_repository import DashboardRepository


class DashboardService:

    def __init__(self):
        self.repository = DashboardRepository()

    def get_dashboard(self):

        resumes = self.repository.get_resume_files()
        score_distribution = self.repository.get_score_distribution()

        prediction_distribution = self.repository.get_prediction_distribution()

        skill_counter = Counter()
        language_counter = Counter()

        base = Path("data/processed/parsed_CV")

        for resume in resumes:
            files = list(base.rglob(f"{resume['filename']}.json"))

            if not files:
                continue

            with open(files[0], encoding="utf-8") as f:
                data = json.load(f)

            language = data.get("language")

            if language:
                language_counter[language] += 1

            for skill in data.get("skills", []):
                skill_counter[skill] += 1

        prediction_distribution = self.repository.get_prediction_distribution()

        return {

            "charts": {

                "score_distribution": score_distribution,

                "languages_distribution": [

                    {
                        "name": k,
                        "value": v
                    }

                    for k, v in language_counter.items()

                ],

                "skills_distribution": [

                    {
                        "name": k,
                        "value": v
                    }

                    for k, v in skill_counter.most_common(10)

                ],

                "prediction_distribution": prediction_distribution

            }

        }