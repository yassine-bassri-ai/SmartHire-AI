from sklearn.model_selection import train_test_split


def split_dataset(df):

    columns_to_drop = [
        "resume_id",
        "job_id",
        "best_match"
    ]

    # Supprime uniquement les colonnes qui existent
    columns_to_drop = [
        col for col in columns_to_drop
        if col in df.columns
    ]

    X = df.drop(columns=columns_to_drop)

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