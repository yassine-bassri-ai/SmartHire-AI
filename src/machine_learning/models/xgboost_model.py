from xgboost import XGBClassifier


def build_model():

    return XGBClassifier(

        n_estimators=300,

        learning_rate=0.05,

        max_depth=8,

        subsample=0.8,

        colsample_bytree=0.8,

        eval_metric="logloss",

        random_state=42

    )