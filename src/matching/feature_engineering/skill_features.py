from typing import List


def compute_skill_features(
    resume_skills: List[str],
    job_skills: List[str]
) -> dict:

    resume = {
        skill.lower().strip()
        for skill in resume_skills
    }

    job = {
        skill.lower().strip()
        for skill in job_skills
    }

    common = resume & job

    missing = job - resume

    extra = resume - job

    union = resume | job

    if len(job) == 0:
        overlap = 0.0
    else:
        overlap = len(common) / len(job)

    if len(union) == 0:
        jaccard = 0.0
    else:
        jaccard = len(common) / len(union)

    return {

        "resume_skill_count": len(resume),

        "job_skill_count": len(job),

        "common_skills": len(common),

        "missing_skills": len(missing),

        "extra_skills": len(extra),

        "skill_overlap_ratio": round(overlap, 4),

        "skill_jaccard": round(jaccard, 4)
    }