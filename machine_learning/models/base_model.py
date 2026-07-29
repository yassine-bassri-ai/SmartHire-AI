from abc import ABC, abstractmethod
from machine_learning.utils.logger import get_logger


class BaseModel(ABC):

    def __init__(self):

        self.model = None

        self.logger = get_logger(

            self.__class__.__name__

        )

    @abstractmethod
    def build_model(self):

        pass

    def train(

        self,

        X_train,

        y_train

    ):

        self.logger.info(

            "Training started..."

        )

        self.model.fit(

            X_train,

            y_train

        )

        self.logger.info(

            "Training completed."

        )

    def predict(

        self,

        X

    ):

        return self.model.predict(X)

    def predict_proba(

        self,

        X

    ):

        return self.model.predict_proba(X)

    def score(

        self,

        X,

        y

    ):

        return self.model.score(

            X,

            y

        )

    def get_model(self):

        return self.model