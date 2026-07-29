import pandas as pd


WEIGHTS = {
    "skills": 0.45,
    "education": 0.20,
    "experience": 0.15,
    "languages": 0.10,
    "certifications": 0.10,
}


def compute_final_score(row):

    skills = row["skill_overlap_ratio"] * 100

    education = row["education_match"] * 100

    experience = row["experience_match"] * 100

    languages = row["language_overlap"] * 100

    certifications = row["certification_overlap"] * 100

    score = (

        skills * WEIGHTS["skills"]

        + education * WEIGHTS["education"]

        + experience * WEIGHTS["experience"]

        + languages * WEIGHTS["languages"]

        + certifications * WEIGHTS["certifications"]

    )

    return round(score, 2)


def generate_label(score):

    return int(score >= 70)


def build_training_dataset(df):

    print("\nGenerating labels...")

    df["final_score"] = df.apply(

        compute_final_score,

        axis=1

    )

    df["best_match"] = df["final_score"].apply(

        generate_label

    )

    print("Done.")

    return df