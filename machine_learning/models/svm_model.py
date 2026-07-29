from sklearn.svm import SVC

from machine_learning.config import SVM

from machine_learning.models.base_model import BaseModel


class SVMModel(BaseModel):

    def __init__(self):

        super().__init__()

        self.build_model()

    def build_model(self):

        self.model = SVC(

            **SVM

        )