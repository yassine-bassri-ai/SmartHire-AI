import numpy as np

from src.deep_learning.distilbert_model import (
    DistilBERTModel
)

from src.deep_learning.embedding_cache import EmbeddingCache

cache = EmbeddingCache(
    "artifacts/embeddings/cache.pkl"
)

class EmbeddingGenerator:

    def __init__(self):

        self.model = DistilBERTModel.load()

    def generate(self, text):

        if not text:

            text = ""

        if cache.contains(text):

            return cache.get(text)

        embedding = self.model.encode(

            text,

            convert_to_numpy=True,

            normalize_embeddings=True

        )

        cache.set(

            text,

            embedding

        )

        cache.save()

        return embedding