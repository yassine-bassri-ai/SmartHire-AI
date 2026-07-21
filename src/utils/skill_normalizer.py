SKILL_TRANSLATIONS = {

    # AI
    "intelligence artificielle": "artificial intelligence",
    "apprentissage automatique": "machine learning",

    # Data
    "science des données": "data science",
    "analyse de données": "data analysis",
    "analyste de données": "data analyst",

    # Database
    "base de données": "database",
    "bases de données": "database",

    # BI
    "informatique décisionnelle": "business intelligence",

    # Cloud
    "informatique en nuage": "cloud computing",

    # Web
    "développement web": "web development",

    # Gestion
    "gestion de projet": "project management",

    # Languages
    "anglais": "english",
    "français": "french"
}


def normalize_skill(skill: str):

    skill = skill.lower().strip()

    return SKILL_TRANSLATIONS.get(skill, skill)