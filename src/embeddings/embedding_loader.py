import pickle


class EmbeddingLoader:

    def __init__(self, file):

        with open(file, "rb") as f:

            self.embeddings = pickle.load(f)

    def get(self, key):

        return self.embeddings.get(key)