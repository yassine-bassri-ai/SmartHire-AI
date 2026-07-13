### PROJECT_LOG

Date : 12/07/2026

### Objectif :
* Définir le projet et préparer l'environnement.

### Travaux réalisés :
* Définition des objectifs.
* Choix des technologies.
* Création de la structure du projet.
* Initialisation de Git.

### Problèmes rencontrés :
...

### Solutions :
...

### Temps de travail :
...

### À faire demain :
  * Recherche et analyse des jeux de données.

------------------------------------------------------------------------------------------------------------------

## Jour 2 et 3 - Analyse du problème et conception du projet et Recherche et sélection des jeux de données 

### Date: 13/07/2026

### Objectif

Identifier les besoins du projet et concevoir le pipeline global avant de commencer le développement et sélectionner les jeux de données qui serviront au développement de SmartHire AI.

### Travaux réalisés

* Identification du problème de Machine Learning : classification binaire (candidat compatible / non compatible).
* Définition du second objectif : classement des candidats selon un score de compatibilité.
* Identification des données nécessaires :
   - CV des candidats.
   - Offres d'emploi.
   - Données de correspondance (matching).
* Définition des futures variables d'entrée (features) et de la variable cible (target).
* Analyse des besoins en données du projet.
* Étude de plusieurs jeux de données disponibles.
* Sélection du dataset principal `job_applicant_dataset.csv`.
* Analyse de sa structure (10 000 enregistrements, 9 colonnes, aucune valeur manquante).
* Identification des colonnes utiles :

  * Resume
  * Job Description
  * Job Roles
  * Best Match
* Décision d'écarter les colonnes susceptibles d'introduire des biais :
  * Gender
  * Race
  * Ethnicity
  * Job Applicant Name
* Sélection d'un second jeu de données composé de CV au format PDF (français et anglais).

### Décisions prises

* Utiliser `job_applicant_dataset.csv` comme dataset principal pour l'entraînement et l'évaluation des modèles.
* Utiliser les CV PDF pour développer et tester le pipeline réel d'extraction de texte.
* Construire un pipeline bilingue (français / anglais).
* Utiliser spaCy avec un modèle adapté à chaque langue.
* Comparer les modèles de Machine Learning classiques avec DistilBERT.

### Architecture des données validée

1. CV PDF
2. Extraction du texte
3. Prétraitement NLP
4. Extraction des compétences
5. Représentation numérique
6. Machine Learning / DistilBERT
7. Stockage des résultats dans MySQL
8. Interface Streamlit
9. Tableau de bord Power BI

### Difficultés rencontrées

Aucune difficulté majeure.

### Temps de travail

À compléter.

### Compétences acquises

* Évaluation de jeux de données.
* Sélection de données adaptées à un problème de Machine Learning.
* Conception d'un pipeline complet de recrutement intelligent.
* Identification des risques de biais dans les données.

### Leçons apprises

* La qualité des données est aussi importante que le choix des modèles.
* Les données réelles (CV PDF) permettent de construire une application plus proche des besoins des recruteurs.
* Il est préférable de définir l'architecture des données avant de commencer le développement.

### À faire (Jour 4)

* Développer le module d'extraction de texte à partir des CV PDF.
* Comparer plusieurs bibliothèques d'extraction.
* Choisir la meilleure solution pour le projet.

------------------------------------------------------------------------------------------------------------------------

# Jour 4: 