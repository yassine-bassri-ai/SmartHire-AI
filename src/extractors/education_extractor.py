import re
from src.resources.education import EDUCATION


def extract_education(text: str):

    text = text.lower()

    result = []

    for degree in EDUCATION:

        if re.search(r"\b" + re.escape(degree) + r"\b", text):

            result.append(degree)

    return sorted(list(set(result)))