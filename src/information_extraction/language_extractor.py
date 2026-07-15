LANGUAGES = {
    "english",
    "anglais",
    "french",
    "français",
    "arabic",
    "arabe",
    "spanish",
    "espagnol",
    "german",
    "allemand",
    "italian",
    "italien"
}


def extract_languages(text):

    text = text.lower()

    found = []

    for language in LANGUAGES:

        if language in text:

            found.append(language)

    return sorted(list(set(found)))