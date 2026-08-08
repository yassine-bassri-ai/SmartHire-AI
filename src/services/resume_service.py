from pathlib import Path

from src.preprocessing.pdf_extraction import extract_text_from_pdf
from src.preprocessing.text_cleaner import clean_text
from src.preprocessing.language_detectee import detect_language

from src.information_extraction.parser import parse_cv

from src.database.resume_repository import ResumeRepository

class ResumeService:
    def __init__(self):

        self.repository = ResumeRepository()

    def parse_resume(

        self,

        pdf_path: str

    ):

        pdf_path = Path(pdf_path)

        raw_text = extract_text_from_pdf(

            pdf_path

        )

        cleaned_text = clean_text(

            raw_text

        )

        language = detect_language(

            cleaned_text

        )

        resume = parse_cv(

            cleaned_text,

            pdf_path.stem,

            language

        )

        if not self.repository.exists(

            resume["filename"]

        ):

            self.repository.insert(

                resume_name=resume["filename"],

                language=resume["language"],

                experience=resume["experience_years"]

            )

        return resume

    def get_resume_by_id(
        self,
        resume_id
    ):

        return self.repository.get_by_id(
            resume_id
        )
    def parse_all_resumes(self, folder_path: str):

        folder = Path(folder_path)

        inserted = 0

        for pdf_file in folder.rglob("*.pdf"):

            self.parse_resume(str(pdf_file))

            inserted += 1

        return inserted