from sklearn.tree import DecisionTreeClassifier
from machine_learning.config import DECISION_TREE
from machine_learning.models.base_model import BaseModel


class DecisionTreeModel(BaseModel):

    def __init__(self):

        super().__init__()

        self.build_model()

    def build_model(self):

        self.model = DecisionTreeClassifier(

            **DECISION_TREE

        )