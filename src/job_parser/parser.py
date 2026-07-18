from src.extractors.certification_extractor import extract_certifications
from src.extractors.skill_extractor import extract_skills
from src.extractors.education_extractor import extract_education
from src.extractors.language_extractor import extract_languages
from src.extractors.experience_extractor import extract_years_of_experience


def parse_job(job_title, description):

    result = {

        "job_title": job_title,

        "skills": extract_skills(description),

        "education": extract_education(description),

        "languages": extract_languages(description),

        "experience_years": extract_years_of_experience(description),

        "certifications": extract_certifications(description)

    }

    return result