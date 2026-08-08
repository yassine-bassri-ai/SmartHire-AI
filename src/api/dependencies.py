from functools import lru_cache

from src.inference.model_loader import ModelLoader


@lru_cache()

def get_model():

    loader = ModelLoader()

    return loader.load()