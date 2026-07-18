import re
from datetime import datetime


CURRENT_YEAR = datetime.now().year


def extract_years_of_experience(text: str):

    years = re.findall(r"(19\d{2}|20\d{2})", text)

    years = [int(y) for y in years]

    if len(years) < 2:

        return 0

    first = min(years)

    last = max(years)

    if last > CURRENT_YEAR:

        last = CURRENT_YEAR

    experience = last - first

    if experience < 0:

        experience = 0

    return experience