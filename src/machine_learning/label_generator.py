import pandas as pd


def compute_label(row):

    score = 0

    # ------------------------------------------------------
    # Skills
    # ------------------------------------------------------

    if row["skill_overlap_ratio"] >= 0.60:
        score += 2

    if row["skill_jaccard"] >= 0.50:
        score += 1

    # ------------------------------------------------------
    # Education
    # ------------------------------------------------------

    if row["education_match"] == 1:
        score += 1

    # ------------------------------------------------------
    # Experience
    # ------------------------------------------------------

    if row["experience_match"] == 1:
        score += 1

    if row["experience_ratio"] >= 0.80:
        score += 1

    # ------------------------------------------------------
    # Languages
    # ------------------------------------------------------

    if row["language_overlap"] >= 0.50:
        score += 1

    # ------------------------------------------------------
    # Certifications
    # ------------------------------------------------------

    if row["certification_overlap"] >= 0.50:
        score += 1

    # ------------------------------------------------------
    # TF-IDF Similarity
    # ------------------------------------------------------

    if row["tfidf_similarity"] >= 0.35:
        score += 1

    # ------------------------------------------------------
    # Semantic Similarity (DistilBERT)
    # ------------------------------------------------------

    if row["semantic_similarity"] >= 0.70:
        score += 2

    # ------------------------------------------------------
    # Final Label
    # ------------------------------------------------------

    return 1 if score >= 6 else 0



def generate_labels(input_csv, output_csv):
    df = pd.read_csv(input_csv)

    print()
    print("=" * 60)
    print("Generating labels...")
    print("=" * 60)

    df["best_match"] = df.apply(

        compute_label,

        axis=1

    )

    df.to_csv(

        output_csv,

        index=False

    )

    print()
    print(df.head())
    print()

    print("Dataset Shape :", df.shape)
    print()

    print("Label Distribution")
    print(df["best_match"].value_counts())
    print()

    print("Label Ratio")
    print(df["best_match"].value_counts(normalize=True))