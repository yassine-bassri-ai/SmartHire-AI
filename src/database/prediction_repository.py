from src.database.connection import DatabaseConnection


class PredictionRepository:

    def __init__(self):
        self.db = DatabaseConnection()
        self.connection = DatabaseConnection().connect()
        self.cursor = self.connection.cursor(
            dictionary=True,
            buffered=True
        )

    def insert(self, resume_id, job_id, prediction, probability):

        connection = DatabaseConnection().connect()

        cursor = connection.cursor(dictionary=True,buffered=True)

        sql = """
        INSERT INTO predictions(
            resume_id,
            job_id,
            prediction,
            probability
        )
        VALUES(%s,%s,%s,%s)
        """

        cursor.execute(
            sql,
            (
                resume_id,
                job_id,
                prediction,
                probability
            )
        )

        connection.commit()

        cursor.close()
        connection.close()

    def get_all(self):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)

        cursor.execute("""
            SELECT *
            FROM predictions
            ORDER BY probability DESC
        """)

        results = cursor.fetchall()

        cursor.close()
        connection.close()

        return results

    def get_by_resume(self, resume_id):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)

        cursor.execute(
            """
            SELECT *
            FROM predictions
            WHERE resume_id=%s
            ORDER BY probability DESC
            """,
            (resume_id,),
        )

        results = cursor.fetchall()

        cursor.close()
        connection.close()

        return results

    def delete_resume_predictions(self, resume_id):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)

        cursor.execute(
            """
            DELETE FROM predictions
            WHERE resume_id=%s
            """,
            (resume_id,),
        )

        connection.commit()

        cursor.close()
        connection.close()

    def get_top10(self, resume_id):
        connection = DatabaseConnection().connect()
        
        cursor = connection.cursor(dictionary=True,buffered=True)

        cursor.execute(
            """
            SELECT *
            FROM predictions
            WHERE resume_id=%s
            ORDER BY probability DESC
            LIMIT 10
            """,
            (resume_id,),
        )

        results = cursor.fetchall()

        cursor.close()
        connection.close()

        return results

    def get_by_resume_job(self, resume_id: int):

        connection = DatabaseConnection().connect()

        cursor = connection.cursor(
            dictionary=True,
            buffered=True
        )

        cursor.execute(
            """
            SELECT
                p.id,
                p.resume_id,
                p.job_id,
                p.prediction,
                p.probability,
                j.job_title,
                j.company,
                j.language,
                j.experience_required
            FROM predictions p
            LEFT JOIN jobs j
                ON p.job_id = j.id
            WHERE p.resume_id = %s
            ORDER BY p.probability DESC
            """,
            (resume_id,)
        )

        predictions = cursor.fetchall()

        cursor.close()
        connection.close()

        return predictions