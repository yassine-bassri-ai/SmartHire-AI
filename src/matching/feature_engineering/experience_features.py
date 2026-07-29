def compute_experience_features(

    resume_years: int,

    required_years: int

) -> dict:

    resume_years = max(0, resume_years)
    required_years = max(0, required_years)

    gap = resume_years - required_years

    if required_years == 0:
        ratio = 1.0
    else:
        ratio = round(
            resume_years / required_years,
            4
        )

    return {

        "resume_years": resume_years,

        "required_years": required_years,

        "experience_gap": gap,

        "experience_match": int(
            resume_years >= required_years
        ),

        "experience_ratio": ratio

    }
