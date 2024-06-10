# Refonte du Frontend d'un SaaS - Version 1

<br>

## Introduction

Ce projet est une refonte de la version 1 du frontend d'un SaaS, utilisant la bibliothèque ChartJS pour créer un tableau de bord dynamique. Le tableau de bord permet de visualiser et de consulter de manière visuelle des données en fonction de la date choisie. Chaque point du graphique peut être consulté pour obtenir un aperçu détaillé des données à un moment donné.

<br>

## Fonctionnalités

- **Tableau de bord dynamique** : Visualisation des données en fonction d'un sujet et la date sélectionnée.
- **Utilisation de ChartJS** : Graphiques interactifs et dynamiques.
- **Affichage des données détaillées** : En cliquant sur un point du graphique, les données de ce moment apparaissent dans une sidebar pour un aperçu détaillé.
- **Sélection de la tranche horaire** : Affichage des données sur une période de 24 heures. Par exemple, en affichant une tranche de 24 heures, le graphique affiche les données sur 24 heures. En cliquant sur le point de 14h00, les données de cette heure apparaissent de manière détaillée.

## Prérequis

- Node.js
- npm (ou yarn)

<br>

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/4d3n4n/React-Chart-JS-Dynamic-Dashboard.git
   cd votre-repo
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```
<br>

## Utilisation

1. Démarrez l'application :

   ```bash
   npm start
   ```
   ou
   ```bash
   yarn start
   ```

2. Ouvrez votre navigateur et allez à http://localhost:3000.

<br>

## Modification des données de test
Vous pouvez modifier les données de test depuis le fichier `dataExemple.json`.

<br>

## Utilisation du calendrier dynamique
Il faut importer ou installer aussi le composant suivant pour utiliser le calendrier dynamique :

   ```bash
   npm install react-datepicker
   ```

Puis, dans votre code, importez-le avec :

   ```javascript
   import DatePicker from 'react-datepicker';
   ```

<br>

## Technologies utilisées
- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **ChartJS** : Bibliothèque JavaScript pour créer des graphiques interactifs et dynamiques.
- **React Router** : Bibliothèque pour gérer la navigation dans l'application.
- **React DatePicker** : Composant pour sélectionner des dates de manière interactive.

## Démonstration
Voici un aperçu de l'application :

https://github.com/4d3n4n/React-Chart-JS-Dynamic-Dashboard/assets/140979426/4e44f386-aa2b-4257-808e-067cec7d0ef7

<br>

## Contribution
Les contributions sont les bienvenues ! Veuillez suivre les étapes suivantes pour contribuer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité `git checkout -b feature/AmazingFeature`.
3. Commitez vos modifications `git commit -m 'Add some AmazingFeature'`.
4. Poussez la branche `git push origin feature/AmazingFeature`.
5. Ouvrez une Pull Request.

Merci d'utiliser ce projet ! 😊
