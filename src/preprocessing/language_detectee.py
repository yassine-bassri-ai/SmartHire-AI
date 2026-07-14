from langdetect import detect, DetectorFactory

DetectorFactory.seed = 42

def detect_language(text: str) -> str:
    if not text or len(text.strip()) < 20:
        return "unknown"
    try:
        language = detect(text)
        return language
    except Exception:
        return "unknown"