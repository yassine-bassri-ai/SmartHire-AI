from sklearn.svm import SVC


def build_model():

    return SVC(

        kernel="rbf",

        probability=True,

        class_weight="balanced",

        random_state=42

    )