import re

SKILLS = {
    "python",
    "java",
    "c",
    "c++",
    "c#",
    "sql",
    "mysql",
    "oracle",
    "postgresql",
    "mongodb",
    "tensorflow",
    "keras",
    "pytorch",
    "scikit-learn",
    "pandas",
    "numpy",
    "matplotlib",
    "opencv",
    "power bi",
    "tableau",
    "excel",
    "git",
    "github",
    "docker",
    "kubernetes",
    "linux",
    "fastapi",
    "flask",
    "django",
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision"
}


def extract_skills(text: str) -> list:
    text = text.lower()

    found = []

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):

            found.append(skill)

    return sorted(list(set(found)))