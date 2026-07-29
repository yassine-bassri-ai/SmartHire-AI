class LeaderBoard:

    def __init__(self):

        self.best_model = None

        self.best_name = None

        self.best_metrics = None

    def update(

        self,

        model,

        model_name,

        metrics

    ):

        if self.best_metrics is None:

            self.best_model = model

            self.best_name = model_name

            self.best_metrics = metrics

            return

        if metrics["f1"] > self.best_metrics["f1"]:

            self.best_model = model

            self.best_name = model_name

            self.best_metrics = metrics