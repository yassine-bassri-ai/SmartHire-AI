from sklearn.ensemble import RandomForestClassifier
from machine_learning.config import RANDOM_FOREST
from machine_learning.models.base_model import BaseModel


class RandomForestModel(BaseModel):

    def __init__(self):

        super().__init__()

        self.build_model()

    def build_model(self):

        self.model = RandomForestClassifier(

            **RANDOM_FOREST

        )