import re
from src.resources.certifications import CERTIFICATIONS


def extract_certifications(text):

    text = text.lower()

    found = []

    for cert in CERTIFICATIONS:

        if re.search(r"\b" + re.escape(cert) + r"\b", text):

            found.append(cert)

    return sorted(list(set(found)))