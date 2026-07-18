from pathlib import Path
import json
import pandas as pd

from src.job_parser.parser import parse_job


def parse_jobs(csv_file: Path, output_folder: Path):

    output_folder.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(csv_file)

    success = 0

    for index, row in df.iterrows():

        job = parse_job(
            row["Job Title"],
            row["Clean_Job_Description"]
        )

        filename = f"job_{index+1:04d}.json"

        with open(
            output_folder / filename,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                job,
                f,
                indent=4,
                ensure_ascii=False
            )

        success += 1

        print(f"{success}/{len(df)}")

    print("\nTerminé.")