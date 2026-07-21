WEIGHTS = {
    "skills": 0.45,
    "education": 0.20,
    "experience": 0.15,
    "languages": 0.10,
    "certifications": 0.10,
}


def final_score(scores: dict) -> float:
    total = (
        scores["skills"] * WEIGHTS["skills"]
        + scores["education"] * WEIGHTS["education"]
        + scores["experience"] * WEIGHTS["experience"]
        + scores["languages"] * WEIGHTS["languages"]
        + scores["certifications"] * WEIGHTS["certifications"]
    )

    return round(total, 2)


def recommendation(score: float) -> str:

    if score >= 85:
        return "Highly Recommended"

    if score >= 70:
        return "Recommended"

    if score >= 50:
        return "Consider"

    return "Not Recommended"