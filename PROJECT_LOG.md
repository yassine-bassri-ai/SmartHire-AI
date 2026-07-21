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

-----------------------------------------------------------------------------------------
# 📅 JOUR 5 – Prétraitement NLP et Développement du CV Parser

**Date :** 15/07/2026

---

#  Objectif

Mettre en place un pipeline complet permettant de transformer automatiquement les CV PDF en données structurées prêtes à être exploitées par les modèles de Machine Learning, Deep Learning et le moteur de Matching.

---

#  Travail réalisé

## 1. Prétraitement NLP

Développement du pipeline de prétraitement des textes extraits des CV.

Création des modules :

- text_cleaner.py
- tokenizer.py
- stopwords_remover.py
- lemmatizer.py
- preprocessing_pipeline.py

Le pipeline réalise automatiquement :

- conversion en minuscules ;
- suppression des caractères spéciaux ;
- suppression des ponctuations ;
- suppression des espaces inutiles ;
- suppression des chiffres non pertinents ;
- tokenisation ;
- suppression des stop words ;
- lemmatisation.

Tous les CV sont ensuite enregistrés sous forme de fichiers texte nettoyés dans :

```
data/processed/cleaned_text/
```

---

## 2. Détection automatique de la langue

Mise en place de la détection automatique de la langue (français / anglais) lors du traitement des CV afin de faciliter les étapes suivantes du pipeline.

---

## 3. Développement du CV Parser

Création du module :

```
src/information_extraction/
```

Développement des composants suivants :

- parser.py
- skill_extractor.py
- education_extractor.py
- experience_extractor.py
- language_extractor.py
- certification_extractor.py
- cv_parser_pipeline.py

---

## 4. Extraction automatique des informations

Développement des extracteurs permettant d'identifier automatiquement :

- les compétences techniques ;
- le niveau d'études ;
- les années d'expérience ;
- les langues parlées ;
- les certifications.

Les informations sont ensuite regroupées dans une structure JSON.

Exemple :

```json
{
    "filename": "Alix_Lamotte",
    "language": "english",
    "skills": [
        "python",
        "sql",
        "power bi"
    ],
    "education": [
        "master"
    ],
    "experience_years": 3,
    "languages": [
        "english",
        "french"
    ],
    "certifications": [],
    "parsing_status": "success",
    "parsed_at": "2026-07-15T20:30:00"
}
```

---

## 5. Pipeline complet de parsing

Développement d'un pipeline permettant de :

- parcourir automatiquement tous les CV prétraités ;
- appliquer le CV Parser sur chaque CV ;
- générer un fichier JSON pour chaque CV ;
- enregistrer les résultats dans :

```
data/processed/parsed_cv/
```

---

## 6. Validation et tests

Tests réalisés sur plusieurs CV en français et en anglais.

Corrections apportées :

- résolution des erreurs d'import Python ;
- correction des chemins de fichiers ;
- correction des erreurs liées au traitement des PDF ;
- amélioration de l'organisation des dossiers ;
- correction du pipeline de parsing ;
- amélioration de la gestion des langues.

---

#  Structure ajoutée

```
src/
├── preprocessing/
│   ├── text_cleaner.py
│   ├── tokenizer.py
│   ├── stopwords_remover.py
│   ├── lemmatizer.py
│   └── preprocessing_pipeline.py
│
└── information_extraction/
    ├── parser.py
    ├── skill_extractor.py
    ├── education_extractor.py
    ├── experience_extractor.py
    ├── language_extractor.py
    ├── certification_extractor.py
    └── cv_parser_pipeline.py
```

---

#  Résultats obtenus

À l'issue de cette étape, le projet est capable de :

- extraire automatiquement le texte des CV ;
- nettoyer et normaliser les textes ;
- détecter la langue des CV ;
- extraire les principales informations (compétences, diplômes, expériences, langues et certifications) ;
- convertir chaque CV en un fichier JSON structuré ;
- préparer les données pour les prochaines étapes du projet.

---

#  Prochaine étape (Jour 6)

Développer le **Job Parser** afin d'extraire automatiquement les informations des offres d'emploi, puis commencer le **Feature Engineering** pour préparer les données destinées aux modèles de Machine Learning et au moteur de Matching.

------------------------------------------------------------------------------------------------------------------------

# JOUR 6 - Prétraitement NLP et Job Parser des offres d'emploi

**Date:** 17/07/2026
## Objectif

Préparer les offres d'emploi pour la phase de matching en appliquant le pipeline de prétraitement NLP, puis développer un Job Parser capable d'extraire automatiquement les informations importantes de chaque offre et de les convertir en fichiers JSON structurés.

---

## Travail réalisé

### 1. Prétraitement des offres d'emploi

- Analyse du dataset des offres d'emploi (`jobs.csv`).
- Vérification des dimensions, des types de données, des valeurs manquantes et des doublons.
- Nettoyage du dataset.
- Réutilisation du pipeline NLP développé pour les CV.
- Développement du module `job_preprocessing.py`.
- Développement du pipeline `job_pipeline.py`.
- Détection et gestion des langues non supportées.
- Prétraitement des **2253 descriptions d'emploi**.
- Génération du fichier :

```
data/processed/job_descriptions/jobs_preprocessed.csv
```

---

### 2. Développement du Job Parser

Création du module :

```
src/job_parser/
```

Développement des composants suivants :

- `parser.py`
- `pipeline.py`

Le Job Parser réutilise les extracteurs déjà développés pour les CV :

- Skill Extractor
- Education Extractor
- Experience Extractor
- Language Extractor
- Certification Extractor

Chaque offre d'emploi est automatiquement analysée afin d'extraire :

- le titre du poste ;
- les compétences techniques ;
- le niveau d'études requis ;
- les années d'expérience ;
- les langues demandées ;
- les certifications.

---

### 3. Génération des offres structurées

Développement du pipeline permettant de :

- lire `jobs_preprocessed.csv` ;
- analyser chaque offre d'emploi ;
- générer un fichier JSON par offre.

Les fichiers sont enregistrés dans :

```
data/processed/parsed_jobs/
```

---

##  Nouveaux fichiers développés

```
src/job_processing/
    job_preprocessing.py
    job_pipeline.py

src/job_parser/
    parser.py
    pipeline.py

tests/
    test_job_preprocessing.py
    test_job_parser.py
```

---

##  Résultats

- Dataset nettoyé et prétraité.
- 2253 offres d'emploi traitées.
- Création du fichier `jobs_preprocessed.csv`.
- Génération des fichiers JSON des offres d'emploi.
- Pipeline entièrement automatisé pour le traitement des offres.

---

##  Compétences acquises

- Prétraitement NLP des descriptions d'emploi.
- Réutilisation d'un pipeline NLP.
- Extraction automatique d'informations.
- Génération de fichiers JSON.
- Réutilisation de modules entre CV Parser et Job Parser.
- Organisation modulaire d'un projet Python.

---

##  État du projet

Terminés :

- ✔ Structure du projet
- ✔ Extraction des CV PDF
- ✔ Détection automatique de la langue
- ✔ Prétraitement NLP des CV
- ✔ CV Parser
- ✔ Prétraitement des offres d'emploi
- ✔ Job Parser

Le projet est désormais prêt pour la prochaine étape :

➡ **Jour 7 : Développement du moteur de Matching (CV ↔ Job Description)**.

---------------------------------------------------------------------------------------------------------
# Jour 7 -

**Date :** 21 Juillet 2026

---

# Objectif du Jour

L'objectif principal de cette journée était de développer la première version du moteur de matching (Rule-Based Matching Engine). Ce moteur compare automatiquement les informations extraites d'un CV avec les exigences d'une offre d'emploi afin de produire un score global de compatibilité et une recommandation.

---

# Travaux réalisés

## 1. Création du module Matching

Un nouveau package `matching` a été ajouté dans le projet afin de regrouper tous les composants responsables de la comparaison entre les candidats et les offres d'emploi.

Architecture créée :

```text
src/
│
├── matching/
│   ├── __init__.py
│   ├── skill_matcher.py
│   ├── education_matcher.py
│   ├── experience_matcher.py
│   ├── language_matcher.py
│   ├── certification_matcher.py
│   ├── score_calculator.py
│   └── matching_pipeline.py
```

---

## 2. Développement des modules de comparaison

Les modules suivants ont été développés :

### Skill Matcher

* comparaison des compétences du CV avec celles demandées par l'offre ;
* calcul du pourcentage de compétences correspondantes.

### Education Matcher

* hiérarchie des diplômes implémentée ;
* prise en charge des listes de diplômes extraites des CV ;
* sélection automatique du diplôme le plus élevé.

### Experience Matcher

* comparaison des années d'expérience ;
* score proportionnel lorsque le candidat possède moins d'expérience que celle demandée.

### Language Matcher

* comparaison des langues maîtrisées avec celles exigées.

### Certification Matcher

* comparaison des certifications obtenues avec celles demandées.

---

## 3. Calcul du score global

Un calculateur de score pondéré a été développé.

Répartition des poids :

| Critère        | Poids |
| -------------- | ----: |
| Skills         |  45 % |
| Education      |  20 % |
| Experience     |  15 % |
| Languages      |  10 % |
| Certifications |  10 % |

Le moteur génère également une recommandation automatique :

* Highly Recommended
* Recommended
* Consider
* Not Recommended

---

## 4. Développement du Matching Pipeline

Le pipeline réalise automatiquement les opérations suivantes :

1. chargement des CV au format JSON ;
2. chargement des offres d'emploi ;
3. comparaison des différents critères ;
4. calcul du score final ;
5. génération de la recommandation.

---

## 5. Automatisation du matching

Le pipeline a été amélioré afin de traiter automatiquement tous les fichiers disponibles.

Il parcourt récursivement :

```text
data/processed/parsed_CV/
    ├── english/
    └── french/
```

ainsi que toutes les offres présentes dans :

```text
data/processed/parsed_jobs/
```

Chaque CV est comparé avec toutes les offres disponibles.

---

## 6. Génération des résultats

Les résultats de chaque comparaison sont enregistrés dans :

```text
data/processed/matching_results/
```

Chaque résultat contient notamment :

* nom du candidat ;
* langue du CV ;
* intitulé du poste ;
* score des compétences ;
* score des études ;
* score de l'expérience ;
* score des langues ;
* score des certifications ;
* score global ;
* recommandation.

---

# Difficultés rencontrées

Plusieurs problèmes techniques ont été identifiés puis corrigés :

* résolution des problèmes d'import Python entre les packages (`src`, `utils`, `matching`) ;
* adaptation du moteur à la structure réelle des fichiers JSON ;
* modification du module `education_matcher` pour prendre en charge une liste de diplômes ;
* remplacement du champ `name` par `filename` dans les CV parsés ;
* automatisation du parcours des dossiers `english` et `french`.

---

# Résultat obtenu

Le moteur Rule-Based est désormais capable de :

* parcourir automatiquement l'ensemble des CV ;
* comparer chaque CV avec toutes les offres d'emploi ;
* calculer un score de compatibilité pondéré ;
* produire une recommandation automatique ;
* préparer les données pour leur future insertion dans MySQL.

---

# Perspectives (Jour 8)

Les prochaines améliorations porteront sur :

* normalisation multilingue des compétences (français/anglais) ;
* gestion des synonymes ;
* comparaison approximative (Fuzzy Matching) ;
* intégration de modèles de Machine Learning ;
* comparaison sémantique avec DistilBERT ou Sentence Transformers ;
* stockage des résultats dans MySQL ;
* classement automatique des meilleurs candidats pour chaque offre.

---

# État du projet

**Statut :** ✅ Jour 7 terminé

Le moteur de matching basé sur des règles constitue désormais la première version de l'intelligence de SmartHire AI et servira de base à l'intégration des modèles d'IA dans les prochaines étapes du projet.
