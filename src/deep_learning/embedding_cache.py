from pathlib import Path
import pickle


class EmbeddingCache:

    def __init__(self, cache_file):

        self.cache_file = Path(cache_file)

        self.cache = self.load()

    def load(self):

        if self.cache_file.exists():

            with open(self.cache_file, "rb") as f:

                return pickle.load(f)

        return {}

    def save(self):

        self.cache_file.parent.mkdir(
            parents=True,
            exist_ok=True
        )

        with open(self.cache_file, "wb") as f:

            pickle.dump(self.cache, f)

    def get(self, key):

        return self.cache.get(key)

    def set(self, key, embedding):

        self.cache[key] = embedding

    def contains(self, key):

        return key in self.cache