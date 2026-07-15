from pathlib import Path
from src.preprocessing.text_cleaner import clean_text
from src.preprocessing.language_detectee import detect_language
from src.preprocessing.NLP_processor import process_text


def preprocess_text(text: str):

    cleaned = clean_text(text)

    language = detect_language(cleaned)

    tokens = process_text(cleaned, language)

    return {
        "language": language,
        "cleaned_text": cleaned,
        "tokens": tokens,
        "processed_text": " ".join(tokens)
    }


def preprocess_file(input_file: Path, output_file: Path):

    text = input_file.read_text(encoding="utf-8")

    result = preprocess_text(text)

    output_file.parent.mkdir(parents=True, exist_ok=True)

    output_file.write_text(
        result["processed_text"],
        encoding="utf-8"
    )

    return result