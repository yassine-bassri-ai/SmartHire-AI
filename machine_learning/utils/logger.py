import logging


def get_logger(name: str):

    logger = logging.getLogger(name)

    if not logger.handlers:

        logger.setLevel(logging.INFO)

        formatter = logging.Formatter(

            "%(asctime)s | %(levelname)s | %(message)s"

        )

        console = logging.StreamHandler()

        console.setFormatter(formatter)

        logger.addHandler(console)

    return logger