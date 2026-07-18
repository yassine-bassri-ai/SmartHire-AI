import re
from src.resources.skills import SKILLS


def extract_skills(text: str) -> list:
    text = text.lower()

    found = []

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):

            found.append(skill)

    return sorted(list(set(found)))