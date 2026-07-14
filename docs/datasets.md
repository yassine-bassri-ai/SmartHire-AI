# Datasets utilisés dans SmartHire AI

## Dataset principal

**Nom :** job_applicant_dataset.csv

### Description

Dataset contenant des informations sur des candidats, leurs CV, les offres d'emploi associées et une variable indiquant si le candidat est compatible avec le poste.

### Utilisation

* Entraînement des modèles de Machine Learning.
* Évaluation des performances.
* Comparaison avec DistilBERT.

### Colonnes utilisées

* Resume
* Job Description
* Job Roles
* Best Match

### Colonnes exclues

* Job Applicant Name
* Gender
* Race
* Ethnicity

----------------------------------

## Dataset secondaire

### Description

Collection de CV au format PDF en français et en anglais.

### Utilisation

* Développement du pipeline d'extraction de texte.
* Tests sur des documents réels.
* Démonstration de l'application.

---

## Architecture des données

CV PDF → Extraction du texte → Prétraitement NLP → Extraction des compétences → Similarité CV / Offre → Machine Learning / DistilBERT → MySQL → Streamlit → Power BI
