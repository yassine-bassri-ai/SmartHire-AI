import json
import pickle

from pathlib import Path

from src.deep_learning.embedding_generator import EmbeddingGenerator


generator = EmbeddingGenerator()


def generate_cv_embeddings(

    cv_folder,

    output_file

):

    cv_folder = Path(cv_folder)

    embeddings = {}

    files = list(

        cv_folder.rglob("*.json")

    )

    print(

        f"{len(files)} CV trouvés."

    )

    for file in files:

        with open(

            file,

            encoding="utf8"

        ) as f:

            cv = json.load(f)

        text = []

        text.extend(

            cv.get(

                "skills",

                []

            )

        )

        text.extend(

            cv.get(

                "education",

                []

            )

        )

        text.extend(

            cv.get(

                "languages",

                []

            )

        )

        text.extend(

            cv.get(

                "certifications",

                []

            )

        )

        text.append(

            str(

                cv.get(

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

        "CV embeddings saved."

    )