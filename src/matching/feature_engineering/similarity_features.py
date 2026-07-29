from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def compute_similarity_features(
    resume_text: str,
    job_text: str
) -> dict:

    resume_text = str(resume_text).strip()
    job_text = str(job_text).strip()

    # Aucun texte disponible
    if not resume_text and not job_text:
        return {
            "tfidf_similarity": 0.0
        }

    # Un seul texte disponible
    if not resume_text or not job_text:
        return {
            "tfidf_similarity": 0.0
        }

    try:

        vectorizer = TfidfVectorizer()

        matrix = vectorizer.fit_transform([
            resume_text,
            job_text
        ])

        similarity = cosine_similarity(
            matrix[0],
            matrix[1]
        )[0][0]

        return {
            "tfidf_similarity": round(
                float(similarity),
                4
            )
        }

    except ValueError:

        return {
            "tfidf_similarity": 0.0
        }