from src.matching.feature_engineering.skill_features import (
    compute_skill_features
)

resume = [

    "Python",

    "SQL",

    "Git",

    "Docker",

    "AWS"

]

job = [

    "Python",

    "SQL",

    "Power BI",

    "Docker",

    "Azure"

]

result = compute_skill_features(

    resume,

    job

)

print()

for key, value in result.items():

    print(f"{key:<25} : {value}")