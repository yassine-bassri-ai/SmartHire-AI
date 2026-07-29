from sklearn.linear_model import LogisticRegression

from machine_learning.config import LOGISTIC_REGRESSION

from machine_learning.models.base_model import BaseModel


class LogisticRegressionModel(BaseModel):

    def __init__(self):

        super().__init__()

        self.build_model()

    def build_model(self):

        self.model = LogisticRegression(

            **LOGISTIC_REGRESSION

        )