from collections import Counter
from pathlib import Path
import json

from src.database.connection import DatabaseConnection


class DashboardRepository:

    def __init__(self):
        self.connection = DatabaseConnection().connect()
        self.cursor = self.connection.cursor(
            dictionary=True,
            buffered=True
        )

    # =====================================================
    # KPI
    # =====================================================

    def get_total_resumes(self):
        self.cursor.execute(
            "SELECT COUNT(*) AS total FROM resumes"
        )
        return self.cursor.fetchone()["total"]

    def get_resume_files(self):

        folder = Path("data/processed/parsed_CV")

        resumes = []

        for file in folder.rglob("*.json"):

            with open(file, encoding="utf-8") as f:

                resumes.append(json.load(f))

        return resumes

    def get_total_jobs(self):
        self.cursor.execute(
            "SELECT COUNT(*) AS total FROM jobs"
        )
        return self.cursor.fetchone()["total"]

    def get_total_predictions(self):
        self.cursor.execute(
            "SELECT COUNT(*) AS total FROM predictions"
        )
        return self.cursor.fetchone()["total"]

    # =====================================================
    # Prediction Distribution
    # =====================================================

    def get_prediction_distribution(self):

        self.cursor.execute("""
            SELECT
                prediction,
                COUNT(*) AS total
            FROM predictions
            GROUP BY prediction
        """)

        rows = self.cursor.fetchall()

        output = []

        for row in rows:

            label = (
                "Best Match"
                if row["prediction"] == 1
                else "Not Match"
            )

            output.append({
                "name": label,
                "value": row["total"]
            })

        return output

    # =====================================================
    # Skills
    # =====================================================

    def get_top_skills(self, limit=10):

        skills_counter = Counter()

        folder = Path("data/processed/parsed_CV")

        for json_file in folder.rglob("*.json"):

            try:

                with open(
                    json_file,
                    encoding="utf-8"
                ) as f:

                    data = json.load(f)

                skills = data.get(
                    "skills",
                    []
                )

                for skill in skills:

                    if skill:
                        skills_counter[skill.strip()] += 1

            except Exception:
                continue

        return [
            {
                "name": skill,
                "value": count
            }
            for skill, count in skills_counter.most_common(limit)
        ]

    # =====================================================
    # Languages
    # =====================================================

    def get_languages_distribution(self):

        counter = Counter()

        folder = Path("data/processed/parsed_CV")

        for json_file in folder.rglob("*.json"):

            try:

                with open(
                    json_file,
                    encoding="utf-8"
                ) as f:

                    data = json.load(f)

                for language in data.get(
                    "languages",
                    []
                ):

                    counter[language] += 1

            except Exception:
                pass

        return [
            {
                "name": language,
                "value": count
            }
            for language, count
            in counter.items()
        ]

    # =====================================================
    # Experience Distribution
    # =====================================================

    def get_score_distribution(self):

        self.cursor.execute("""
            SELECT probability
            FROM predictions
        """)

        rows = self.cursor.fetchall()

        counter = {
            "0-49%": 0,
            "50-69%": 0,
            "70-84%": 0,
            "85-100%": 0
        }

        for row in rows:

            score = row["probability"] * 100

            if score < 50:
                counter["0-49%"] += 1

            elif score < 70:
                counter["50-69%"] += 1

            elif score < 85:
                counter["70-84%"] += 1

            else:
                counter["85-100%"] += 1

        return [

            {
                "name": key,
                "value": value
            }

            for key, value in counter.items()

        ]


    def get_experience_distribution(self):

        self.cursor.execute("""
            SELECT experience_years
            FROM resumes
        """)

        rows = self.cursor.fetchall()

        counter = {
            "0-2": 0,
            "3-5": 0,
            "6-10": 0,
            "10+": 0
        }

        for row in rows:

            years = row["experience_years"]

            if years <= 2:
                counter["0-2"] += 1

            elif years <= 5:
                counter["3-5"] += 1

            elif years <= 10:
                counter["6-10"] += 1

            else:
                counter["10+"] += 1

        return [
            {
                "name": key,
                "value": value
            }
            for key, value
            in counter.items()
        ]

    def get_predictions(self):

        connection = DatabaseConnection().connect()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT *
            FROM predictions
        """)

        data = cursor.fetchall()

        print(data[:5])      # <-- AJOUTE CETTE LIGNE

        cursor.close()
        connection.close()

        return data