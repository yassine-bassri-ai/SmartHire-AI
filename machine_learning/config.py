LOGISTIC_REGRESSION = {
    "random_state": 42,
    "max_iter": 1000
}

DECISION_TREE = {
    "criterion": "gini",
    "random_state": 42,
    "max_depth": None
}

RANDOM_FOREST = {
    "n_estimators": 200,
    "criterion": "gini",
    "max_depth": None,
    "random_state": 42,
    "n_jobs": -1
}

SVM = {
    "C": 1.0,
    "kernel": "rbf",
    "probability": True,
    "random_state": 42
}

XGBOOST = {
    "n_estimators": 200,
    "learning_rate": 0.1,
    "max_depth": 6,
    "random_state": 42,
    "eval_metric": "logloss"
}