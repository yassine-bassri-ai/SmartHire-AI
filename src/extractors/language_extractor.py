from src.resources.languages import LANGUAGES


def extract_languages(text):

    text = text.lower()

    found = []

    for language in LANGUAGES:

        if language in text:

            found.append(language)

    return sorted(list(set(found)))