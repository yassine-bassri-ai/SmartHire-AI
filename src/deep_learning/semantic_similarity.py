from sklearn.metrics.pairwise import cosine_similarity

from src.deep_learning.embedding_generator import (
    EmbeddingGenerator
)


class SemanticSimilarity:

    def __init__(self):

        self.generator = EmbeddingGenerator()

    def compute(

        self,

        resume_text: str,

        job_text: str

    ) -> float:

        resume_embedding = self.generator.generate(
            resume_text
        )

        job_embedding = self.generator.generate(
            job_text
        )

        similarity = cosine_similarity(

            [resume_embedding],

            [job_embedding]

        )[0][0]

        return round(

            float(similarity),

            4

        )