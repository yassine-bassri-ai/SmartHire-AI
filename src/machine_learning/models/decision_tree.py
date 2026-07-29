from sklearn.tree import DecisionTreeClassifier


def build_model():

    return DecisionTreeClassifier(

        random_state=42,

        max_depth=15,

        min_samples_split=10,

        class_weight="balanced"

    )