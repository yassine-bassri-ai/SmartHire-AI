from src.database.connection import DatabaseConnection


class MatchingRepository:

    def __init__(self):

        self.connection = DatabaseConnection().connect()

        self.cursor = self.connection.cursor()

    def insert(

        self,

        resume_id,

        job_id,

        score,

        similarity,

        recommendation

    ):

        sql = """
        INSERT INTO matching_results(

            resume_id,
            job_id,
            final_score,
            semantic_similarity,
            recommendation

        )

        VALUES(%s,%s,%s,%s,%s)
        """

        self.cursor.execute(

            sql,

            (

                resume_id,
                job_id,
                score,
                similarity,
                recommendation

            )

        )

        self.connection.commit()