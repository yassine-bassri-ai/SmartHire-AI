from sentence_transformers import SentenceTransformer


class DistilBERTModel:

    _model = None

    @classmethod
    def load(cls):

        if cls._model is None:

            print()

            print("=" * 60)
            print("Loading DistilBERT...")
            print("=" * 60)

            cls._model = SentenceTransformer(

                "all-MiniLM-L6-v2"

            )

            print("DistilBERT loaded successfully.")

            print()

        return cls._model