from langdetect import detect

from src.preprocessing.preprocessing_pipeline import preprocess_text


SUPPORTED_LANGUAGES = {
    "en",
    "fr"
}


def preprocess_job_description(text):

    if not isinstance(text, str):
        return ""

    try:

        language = detect(text)

        if language not in SUPPORTED_LANGUAGES:

            print(f"Langue ignorée : {language}")

            return text

        return preprocess_text(text)

    except Exception:

        return text