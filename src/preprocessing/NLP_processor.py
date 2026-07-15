import spacy

NLP_MODELS = {
    "fr": spacy.load("fr_core_news_md"),
    "en": spacy.load("en_core_web_md")
}


def process_text(text: str, language: str):

    if language not in NLP_MODELS:
        raise ValueError(f"Langue non supportée : {language}")

    nlp = NLP_MODELS[language]

    doc = nlp(text)

    tokens = []

    for token in doc:

        if token.is_stop:
            continue

        if token.is_punct:
            continue

        if token.is_space:
            continue

        lemma = token.lemma_.strip()

        if lemma:

            tokens.append(lemma)

    return tokens