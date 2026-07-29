import time


class Trainer:

    def __init__(self, model, name):

        self.model = model
        self.name = name

    def train(self, X_train, y_train):

        print()
        print("=" * 60)
        print(self.name)
        print("=" * 60)

        start = time.time()

        self.model.fit(
            X_train,
            y_train
        )

        training_time = time.time() - start

        print(
            f"Training Time : {training_time:.2f} sec"
        )

        return self.model, training_time