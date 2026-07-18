def remove_duplicates(df):

    before = len(df)

    df = df.drop_duplicates()

    after = len(df)

    print(f"Doublons supprimés : {before-after}")

    return df


def remove_missing_job_description(df):

    before = len(df)

    df = df.dropna(subset=["Job Description"])

    after = len(df)

    print(f"Lignes supprimées : {before-after}")

    return df

def remove_unused_columns(df):

    columns_to_remove = [
        "Unnamed: 0"
    ]

    df = df.drop(
        columns=columns_to_remove,
        errors="ignore"
    )

    return df

def remove_missing_job_title(df):

    before = len(df)

    df = df.dropna(subset=["Job Title"])

    after = len(df)

    print(f"Lignes supprimées : {before-after}")

    return df