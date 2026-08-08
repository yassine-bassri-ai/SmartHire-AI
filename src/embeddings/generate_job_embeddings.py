import json
import pickle

from pathlib import Path

from src.deep_learning.embedding_generator import EmbeddingGenerator


generator = EmbeddingGenerator()


def generate_job_embeddings(

    job_folder,

    output_file

):

    job_folder = Path(job_folder)

    embeddings = {}

    files = list(

        job_folder.rglob("*.json")

    )

    print(

        f"{len(files)} jobs trouvés."

    )

    for file in files:

        with open(

            file,

            encoding="utf8"

        ) as f:

            job = json.load(f)

        text = []

        text.append(

            job.get(

                "job_title",

                ""

            )

        )

        text.extend(

            job.get(

                "skills",

                []

            )

        )

        text.extend(

            job.get(

                "education",

                []

            )

        )

        text.extend(

            job.get(

                "languages",

                []

            )

        )

        text.extend(

            job.get(

                "certifications",

                []

            )

        )

        text.append(

            str(

                job.get(

                    "experience_years",

                    0

                )

            )

        )

        text = " ".join(text)

        embeddings[file.stem] = (

            generator.generate(

                text

            )

        )

    Path(output_file).parent.mkdir(

        parents=True,

        exist_ok=True

    )

    with open(

        output_file,

        "wb"

    ) as f:

        pickle.dump(

            embeddings,

            f

        )

    print(

        "Job embeddings saved."
    )