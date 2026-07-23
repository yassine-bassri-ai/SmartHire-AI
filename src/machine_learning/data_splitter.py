from sklearn.model_selection import train_test_split


def split_dataset(df):

    X = df.drop(
        columns=[
            "resume_id",
            "job_title",
            "best_match"
        ]
    )

    y = df["best_match"]

    X_train, X_test, y_train, y_test = train_test_split(

        X,
        y,

        test_size=0.2,

        random_state=42,

        stratify=y

    )

    return (

        X_train,
        X_test,

        y_train,
        y_test

    )