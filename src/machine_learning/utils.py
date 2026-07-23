def compute_final_score(features):

    return round(

        features["skill_score"] * 0.45 +

        features["education_score"] * 0.20 +

        features["experience_score"] * 0.15 +

        features["language_score"] * 0.10 +

        features["certification_score"] * 0.10,

        2
    )