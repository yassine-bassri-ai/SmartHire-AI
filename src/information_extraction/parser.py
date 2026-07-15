from datetime import datetime

from src.information_extraction.skill_extractor import extract_skills
from src.information_extraction.education_extractor import extract_education
from src.information_extraction.experience_extractor import extract_years_of_experience
from src.information_extraction.language_extractor import extract_languages
from src.information_extraction.certification_extractor import extract_certifications


def parse_cv(text: str, filename: str, language: str):

    return {

        "filename": filename,

        "language": language,

        "skills": extract_skills(text),

        "education": extract_education(text),

        "experience_years": extract_years_of_experience(text),

        "languages": extract_languages(text),

        "certifications": extract_certifications(text),

        "parsing_status": "success",

        "parsed_at": datetime.now().isoformat()
    }