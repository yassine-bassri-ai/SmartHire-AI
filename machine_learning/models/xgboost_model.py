from xgboost import XGBClassifier
from machine_learning.config import XGBOOST
from machine_learning.models.base_model import BaseModel


class XGBoostModel(BaseModel):

    def __init__(self):

        super().__init__()

        self.build_model()

    def build_model(self):

        self.model = XGBClassifier(

            **XGBOOST

        )