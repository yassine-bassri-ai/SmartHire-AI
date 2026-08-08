from src.database.connection import DatabaseConnection


class JobRepository:

    def __init__(self):

        self.connection = DatabaseConnection().connect()

        self.cursor = self.connection.cursor(dictionary=True,buffered=True)
    

    def insert(
        self,
        job_id,
        title,
        company,
        language,
        experience
    ):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)
        sql = """
        INSERT INTO jobs(
            job_id,
            job_title,
            company,
            language,
            experience_required
        )
        VALUES(%s,%s,%s,%s,%s)
        """

        cursor.execute(
            sql,
            (
                job_id,
                title,
                company,
                language,
                experience
            )
        )

        connection.commit()

        return cursor.lastrowid

    def exists(
        self,
        job_id
    ):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(
            """
            SELECT COUNT(*)
            AS total
            FROM jobs
            WHERE job_id=%s
            """,
            (
                job_id,
            )
        )

        return cursor.fetchone()["total"] > 0

    def get_all(self):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(
            """
            SELECT *
            FROM jobs
            """
        )

        jobs = cursor.fetchall()

        import json

        from pathlib import Path

        output = []

        for job in jobs:

            json_file = (
                Path(
                    "data/processed/parsed_jobs"
                )
                /
                f"{job['job_id']}.json"
            )

            if not json_file.exists():

                continue

            with open(
                json_file,
                encoding="utf-8"
            ) as f:

                data = json.load(f)

            data["id"] = job["id"]

            data["job_id"] = job["job_id"]

            data["company"] = job["company"]

            data["job_title"] = job["job_title"]

            data["language"] = job["language"]

            data["experience_required"] = (
                job["experience_required"]
            )

            output.append(
                data
            )

        return output

    def get_by_id(
        self,
        job_database_id
    ):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(
            """
            SELECT *
            FROM jobs
            WHERE id=%s
            """,
            (
                job_database_id,
            )
        )

        job = cursor.fetchone()

        if job is None:

            return None

        import json

        from pathlib import Path

        json_file = (
            Path(
                "data/processed/parsed_jobs"
            )
            /
            f"{job['job_id']}.json"
        )

        if json_file.exists():

            with open(
                json_file,
                encoding="utf-8"
            ) as f:

                data = json.load(f)

            data["id"] = job["id"]

            data["company"] = job["company"]

            data["job_title"] = job["job_title"]

            data["language"] = job["language"]

            data["experience_required"] = (
                job["experience_required"]
            )

            return data

        return None

    def delete(
        self,
        job_database_id
    ):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)

        sql = """
        DELETE FROM jobs
        WHERE id=%s
        """

        cursor.execute(
            sql,
            (job_database_id,)
        )

        connection.commit()

        return cursor.rowcount > 0
