import re

def clean_text(text: str) -> str:

    if not text:
        return ""

    text = text.lower()

    text = text.replace("\t", " ")

    text = text.replace("\n", " ")

    text = re.sub(r"\s+", " ", text)

    text = re.sub(r"[^\w\s]", " ", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()