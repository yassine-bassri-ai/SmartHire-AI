from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.information_extraction.parser import parse_cv

text = """
Master of Computer Science

Python
TensorFlow
Power BI
SQL

English
French

AWS Certified
IBM

2019 - 2024
"""

result = parse_cv(text)

print(result)