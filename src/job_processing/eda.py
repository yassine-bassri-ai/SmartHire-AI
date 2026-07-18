def dataset_info(df):

    print("=" * 60)
    print("DIMENSIONS")
    print("=" * 60)
    print(df.shape)

    print("\n")

    print("=" * 60)
    print("COLONNES")
    print("=" * 60)
    print(df.columns.tolist())

    print("\n")

    print("=" * 60)
    print("TYPES")
    print("=" * 60)
    print(df.dtypes)

    print("\n")

    print("=" * 60)
    print("VALEURS MANQUANTES")
    print("=" * 60)
    print(df.isnull().sum())

    print("\n")

    print("=" * 60)
    print("DOUBLONS")
    print("=" * 60)
    print(df.duplicated().sum())

    print("\n")

    print("=" * 60)
    print("APERÇU")
    print("=" * 60)
    print(df.head())

def show_job_description(df, index=0):

    print("=" * 80)
    print("JOB TITLE")
    print("=" * 80)

    print(df.loc[index, "Job Title"])

    print("\n")

    print("=" * 80)
    print("JOB DESCRIPTION")
    print("=" * 80)

    print(df.loc[index, "Job Description"])