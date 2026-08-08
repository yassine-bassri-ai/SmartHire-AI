from src.database.connection import DatabaseConnection


class ModelRepository:

    def __init__(self):

        self.db = DatabaseConnection()

        self.connection = self.db.connect()

        self.cursor = self.connection.cursor()

    def insert(

        self,

        model_name,

        accuracy,

        precision,

        recall,

        f1,

        roc_auc

    ):

        sql = """

        INSERT INTO model_history(

            model_name,

            accuracy,

            precision_score,

            recall_score,

            f1_score,

            roc_auc

        )

        VALUES(%s,%s,%s,%s,%s,%s)

        """

        self.cursor.execute(

            sql,

            (

                model_name,

                accuracy,

                precision,

                recall,

                f1,

                roc_auc

            )

        )

        self.connection.commit()

        return self.cursor.lastrowid

    def get_all(self):

        self.cursor.execute(

            "SELECT * FROM model_history"

        )

        return self.cursor.fetchall()