import re

CERTIFICATIONS = [
    "aws",
    "azure",
    "gcp",
    "google cloud",
    "oracle cloud",
    "cisco",
    "ccna",
    "ccnp",
    "tensorflow developer",
    "microsoft",
    "ibm",
    "oracle certified",
    "scrum master",
    "pmp"
]


def extract_certifications(text):

    text = text.lower()

    found = []

    for cert in CERTIFICATIONS:

        if re.search(r"\b" + re.escape(cert) + r"\b", text):

            found.append(cert)

    return sorted(list(set(found)))