from src.machine_learning.dataset_builder_v2 import (
    load_json_folder
)

from src.inference.batch_predictor import (
    BatchPredictor
)


resumes = load_json_folder(

    "data/processed/parsed_CV"

)[:3]

jobs = load_json_folder(

    "data/processed/parsed_jobs"

)[:5]

predictor = BatchPredictor()

results = predictor.predict_all(

    resumes,

    jobs

)

predictor.save(

    results,

    "results/predictions.csv"

)

print(results.head())