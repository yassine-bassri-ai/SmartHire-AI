from pathlib import Path
import sys

# Ajouter la racine du projet au PYTHONPATH
PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.preprocessing.text_cleaner import clean_text

# Fichier à tester
input_file = PROJECT_ROOT / "data" / "processed" / "extracted_text" / "english" / "Alix_Lamotte.txt"

# Lire le texte
with open(input_file, "r", encoding="utf-8") as file:
    raw_text = file.read()

print("=" * 50)
print("Texte original :")
print("=" * 50)
print(raw_text[:1000])   # Afficher les 1000 premiers caractères

# Nettoyage
cleaned_text = clean_text(raw_text)

print("\n" + "=" * 50)
print("Texte nettoyé :")
print("=" * 50)
print(cleaned_text[:1000])