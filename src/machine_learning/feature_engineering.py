from src.matching.skill_matcher import skill_score
from src.matching.education_matcher import education_score
from src.matching.experience_matcher import experience_score
from src.matching.language_matcher import language_score
from src.matching.certification_matcher import certification_score


def extract_features(cv, job):

    features = {

        "skill_score":
            skill_score(
                cv["skills"],
                job["skills"]
            ),

        "education_score":
            education_score(
                cv["education"],
                job["education"]
            ),

        "experience_score":
            experience_score(
                cv["experience_years"],
                job["experience_years"]
            ),

        "language_score":
            language_score(
                cv["languages"],
                job["languages"]
            ),

        "certification_score":
            certification_score(
                cv["certifications"],
                job["certifications"]
            )

    }

    return features