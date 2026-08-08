from src.database.connection import DatabaseConnection


class AnalyticsService:

    def get_analytics(self):

        connection = DatabaseConnection().connect()
        cursor = connection.cursor(dictionary=True, buffered=True)

        try:
            # =========================
            # CVs
            # =========================
            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM resumes
            """)
            total_resumes = cursor.fetchone()["total"]

            # =========================
            # Jobs
            # =========================
            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM jobs
            """)
            total_jobs = cursor.fetchone()["total"]

            # =========================
            # Predictions
            # =========================
            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM predictions
            """)
            total_predictions = cursor.fetchone()["total"]

            # =========================
            # Average score
            # =========================
            cursor.execute("""
                SELECT
                    COALESCE(AVG(probability) * 100, 0) AS average_score
                FROM predictions
            """)
            average_score = cursor.fetchone()["average_score"]

            # =========================
            # Successful predictions
            # =========================
            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM predictions
                WHERE prediction = 1
            """)
            successful_predictions = cursor.fetchone()["total"]

            # =========================
            # Languages
            # =========================
            cursor.execute("""
                SELECT
                    language,
                    COUNT(*) AS total
                FROM resumes
                GROUP BY language
                ORDER BY total DESC
            """)
            languages = cursor.fetchall()

            # =========================
            # Top jobs
            # =========================
            cursor.execute("""
                SELECT
                    p.job_id,
                    j.job_title,
                    COUNT(*) AS matches,
                    ROUND(AVG(p.probability) * 100, 2) AS average_score
                FROM predictions p
                LEFT JOIN jobs j
                    ON p.job_id = j.id
                WHERE p.prediction = 1
                GROUP BY p.job_id, j.job_title
                ORDER BY average_score DESC
                LIMIT 10
            """)
            top_jobs = cursor.fetchall()

            # =========================
            # Score distribution
            # =========================
            cursor.execute("""
                SELECT
                    CASE
                        WHEN probability * 100 < 50 THEN '0-49'
                        WHEN probability * 100 < 70 THEN '50-69'
                        WHEN probability * 100 < 85 THEN '70-84'
                        ELSE '85-100'
                    END AS score_range,
                    COUNT(*) AS total
                FROM predictions
                GROUP BY score_range
                ORDER BY score_range
            """)
            score_distribution = cursor.fetchall()

            return {
                "total_resumes": total_resumes,
                "total_jobs": total_jobs,
                "total_predictions": total_predictions,
                "average_score": round(float(average_score), 2),
                "successful_predictions": successful_predictions,
                "languages": languages,
                "top_jobs": top_jobs,
                "score_distribution": score_distribution
            }

        finally:
            cursor.close()
            connection.close()