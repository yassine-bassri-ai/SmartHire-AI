from src.database.connection import DatabaseConnection
import json
from pathlib import Path

class ResumeRepository:

    def __init__(self):

        self.connection = DatabaseConnection().connect()

        self.cursor = self.connection.cursor(
            dictionary=True,
            buffered=True
        )



    def insert(
        self,
        resume_name,
        language,
        experience
    ):
        connection = DatabaseConnection().connect()
                
        cursor = connection.cursor(dictionary=True,buffered=True)

        sql = """
        INSERT INTO resumes(
            resume_name,
            language,
            experience_years
        )
        VALUES(%s,%s,%s)
        """

        cursor.execute(
            sql,
            (
                resume_name,
                language,
                experience
            )
        )

        connection.commit()

        return cursor.lastrowid


    def exists(
        self,
        resume_name
    ):
        connection = DatabaseConnection().connect()
                
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM resumes
            WHERE resume_name=%s
            """,
            (resume_name,)
        )

        result = cursor.fetchone()

        return result["total"] > 0


    def get_all(self):

        connection = DatabaseConnection().connect()
                
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(
            "SELECT * FROM resumes"
        )

        return cursor.fetchall()


    def get_by_id(self, resume_id):
        connection = None
        cursor = None

        try:
            connection = DatabaseConnection().connect()

            cursor = connection.cursor(
                dictionary=True,
                buffered=True
            )

            cursor.execute(
                """
                SELECT *
                FROM resumes
                WHERE id = %s
                """,
                (resume_id,)
            )

            resume = cursor.fetchone()

            if resume is None:
                return None

            # Recherche du JSON parsé
            folder = Path("data/processed/parsed_CV")

            json_files = list(
                folder.rglob(
                    f"{resume['resume_name']}.json"
                )
            )

            # Si le JSON existe, on retourne ses données
            if json_files:
                json_path = json_files[0]

                print("Resume JSON :", json_path)

                with open(
                    json_path,
                    encoding="utf-8"
                ) as f:
                    data = json.load(f)

                # Ajouter l'ID MySQL
                data["database_id"] = resume["id"]

                # Ajouter également les informations DB
                data["resume_name"] = resume.get("resume_name")
                data["language"] = resume.get("language")
                data["experience_years"] = resume.get("experience_years")

                return data

            # ----------------------------------------
            # JSON introuvable
            # ----------------------------------------
            # Le CV existe quand même dans MySQL.
            # On retourne donc les informations disponibles.
            print(
                f"Resume JSON introuvable pour ID={resume_id}, "
                f"resume_name={resume.get('resume_name')}"
            )

            return {
                "database_id": resume["id"],
                "id": resume["id"],
                "resume_name": resume.get("resume_name"),
                "language": resume.get("language"),
                "experience_years": resume.get("experience_years"),
                "skills": [],
                "education": [],
            }

        finally:
            if cursor:
                cursor.close()

            if connection and connection.is_connected():
                connection.close()

    def delete(
        self,
        resume_id
    ):
        connection = DatabaseConnection().connect()
                
        cursor = connection.cursor(dictionary=True,buffered=True)

        sql = """
        DELETE FROM resumes
        WHERE id=%s
        """

        cursor.execute(
            sql,
            (resume_id,)
        )

        connection.commit()

        return cursor.rowcount > 0
