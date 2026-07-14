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

# Jour 4: Extraction des CV PDF et détection automatique de la langue

## Date14/07/2026

### Objectifs

- Construire un pipeline de prétraitement capable d'extraire automatiquement le texte des CV PDF.
- Détecter automatiquement la langue des CV (Français / Anglais).
- Sauvegarder les textes extraits.
- Générer un fichier de métadonnées pour le suivi des traitements.

---

## Travaux réalisés

### 1. Extraction des CV PDF

- Intégration de la bibliothèque PyMuPDF.
- Développement du module `pdf_extraction.py`.
- Extraction du texte page par page.
- Sauvegarde automatique des textes au format `.txt`.

### 2. Détection automatique de la langue

- Intégration de la bibliothèque `langdetect`.
- Développement du module `language_detector.py`.
- Détection automatique des langues :
  - Français (`fr`)
  - Anglais (`en`)

### 3. Gestion des métadonnées

Création du module `metadata_manager.py`.

Les informations enregistrées pour chaque CV sont :

- Nom du fichier
- Langue
- Nombre de pages
- Nombre de mots
- Nombre de caractères
- Nom du fichier texte généré
- Statut du traitement

Les métadonnées sont sauvegardées dans :

data/processed/resumes_metadata.csv

### 4. Pipeline de prétraitement

Création du module `pipeline.py` permettant d'automatiser :

1. Lecture des CV PDF.
2. Extraction du texte.
3. Détection de la langue.
4. Calcul des statistiques.
5. Sauvegarde des fichiers texte.
6. Mise à jour des métadonnées.

### 5. Organisation du projet

Structure actuelle des modules :

src/
└── preprocessing/
    ├── pdf_extraction.py
    ├── language_detector.py
    ├── metadata_manager.py
    └── pipeline.py

---

## Difficultés rencontrées

- Gestion des chemins avec `pathlib`.
- Configuration des imports Python.
- Lecture des fichiers CSV vides.
- Gestion des erreurs lors du traitement des PDF.

Toutes les difficultés ont été corrigées.

---

## Résultat

Le pipeline est désormais capable de traiter automatiquement un dossier contenant plusieurs CV PDF et de produire :

- les fichiers texte extraits ;
- un fichier de métadonnées centralisé ;
- des statistiques sur chaque document.

Cette étape constitue la base de tout le pipeline NLP qui sera développé par la suite.

---

## Prochaine étape (Jour 5)

Prétraitement NLP :

- Nettoyage des textes
- Normalisation
- Suppression des caractères inutiles
- Tokenisation
- Suppression des stop words
- Lemmatisation