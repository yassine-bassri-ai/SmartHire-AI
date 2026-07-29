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

    """features.update(

        compute_similarity_features(

            resume.get("raw_text", ""),

            job.get("description", "")

        )

    )"""

    return features