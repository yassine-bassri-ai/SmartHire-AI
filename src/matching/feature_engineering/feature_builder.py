from src.matching.feature_engineering.skill_features import (
    compute_skill_features
)

from src.matching.feature_engineering.education_features import (
    compute_education_features
)

from src.matching.feature_engineering.experience_features import (
    compute_experience_features
)

from src.matching.feature_engineering.language_features import (
    compute_language_features
)

from src.matching.feature_engineering.certification_features import (
    compute_certification_features
)

from src.matching.feature_engineering.similarity_features import (
    compute_similarity_features
)

def build_text(document: dict) -> str:

    parts = []

    # Skills
    parts.extend(document.get("skills", []))

    # Education
    education = document.get("education", [])

    if isinstance(education, list):
        parts.extend(education)
    else:
        parts.append(str(education))

    # Languages
    parts.extend(document.get("languages", []))

    # Certifications
    parts.extend(document.get("certifications", []))

    # Experience
    parts.append(
        f"{document.get('experience_years', 0)} years experience"
    )

    # Job title (uniquement pour les offres)
    if "job_title" in document:
        parts.append(document["job_title"])

    # cleaned_text s'il existe
    if document.get("cleaned_text"):
        parts.append(document["cleaned_text"])

    return " ".join(str(x) for x in parts if x)

def build_features(
    resume: dict,
    job: dict
):

    features = {}

    # ---------------------------------------------------
    # Skills
    # ---------------------------------------------------

    features.update(

        compute_skill_features(

            resume.get("skills", []),

            job.get("skills", [])

        )

    )

    # ---------------------------------------------------
    # Education
    # ---------------------------------------------------

    features.update(

        compute_education_features(

            resume.get("education", []),

            job.get("education", [])

        )

    )

    # ---------------------------------------------------
    # Experience
    # ---------------------------------------------------

    features.update(

        compute_experience_features(

            resume.get("experience_years", 0),

            job.get("experience_years", 0)

        )

    )

    # ---------------------------------------------------
    # Languages
    # ---------------------------------------------------

    features.update(

        compute_language_features(

            resume.get("languages", []),

            job.get("languages", [])

        )

    )

    # ---------------------------------------------------
    # Certifications
    # ---------------------------------------------------

    features.update(

        compute_certification_features(

            resume.get("certifications", []),

            job.get("certifications", [])

        )

    )

    # ---------------------------------------------------
    # Similarity
    # ---------------------------------------------------

    resume_text = build_text(resume)

    job_text = build_text(job)

    features.update(

        compute_similarity_features(

                resume_text,

                job_text

        )

    )

    return features