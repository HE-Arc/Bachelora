<!-- README template from: https://github.com/othneildrew/Best-README-Template -->
<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/HE-Arc/Bachelora">
    <img src="frontend/public/favicon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bachelora</h3>

  <p align="justify">
    Bachelora is an application for storing the various bachelor's degree projects offered to students in the Computer Science and Communications Systems programme. Teachers can enter, modify or delete bachelor's work, while students can consult it.
    <br>
    <a href="https://github.com/HE-Arc/Bachelora/wiki"><strong>Explore the docs »</strong></a>
    <br>
    <br>
    <div align="center">
      <a href="https://bachelora.k8s.ing.he-arc.ch/">View Demo (frontend)</a> <br>
      <a href="https://api-bachelora.k8s.ing.he-arc.ch/api/">Test API (backend)</a>
    </div>
    <br>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-mockups">Project Mockups</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#launch-the-project">Launch the project</a></li>
      </ul>
    </li>
    <li><a href="#rendu-intermédiaire">Rendu intermédiaire</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
### Project Mockups
[Created on Figma](https://www.figma.com/proto/SmKhY5qcL2qdMs02uRW3FW/Bachelora?type=design&node-id=18-537&t=VPCcF4PfSFNjYXm2-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=18%3A537&mode=design)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
* [![Django][Django.com]][Django-url]
* [![Vuejs][Vuejs.com]][Vuejs-url]
* [![Quasar][Quasar.com]][Quasar-url]
* [![Figma][Figma.com]][Figma-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple example steps.

### Installation
#### Clone the repository
> En SSH
   ```sh
   git clone git@github.com:HE-Arc/Bachelora.git
   ```
> En HTTP
   ```sh
   git clone https://github.com/HE-Arc/Bachelora.git
   ```

### Launch the project
> ℹ️ **Important**
>
> **The project is separate in two parts: Backend with Django and Frontend with Vuejs**
> The two parts of the project need to be start individually.

#### Backend
To start the backend, you have to create and active the virtual environment. After that, you have to start the python server.

From the subfolder `~\Bachelora\api\`, in a terminal, enter the following commands:

> Create virtual environment
   ```sh
   pipenv install
   ```
> Start virtual environment
   ```sh
   pipenv shell
   ```
> Apply migrations to the database (only if migrations have changed or if it's the first time you clone the project)
   ```sh
   python manage.py migrate
   ```

> Start backend server
   ```sh
   python manage.py runserver
   ```

The backend application is available at http://localhost:8000.

#### Frontend
To start the backend, you have to install the dependency and run the developpement.
From the subfolder `~\Bachelora\frontend\`, in a terminal, enter the following commands:

> Installation of dependency
   ```sh
   npm install
   ```

> Start developement server
   ```sh
   npm run dev
   ```
The frontend application is available at http://localhost:5173.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Rendu intermédiaire

### Page d'affichage de BDD
L'affichage d'une liste de données provenant de la base de données, dans notre application, correspond à la liste des travaux de diplômes : [Liste des TB](https://bachelora.k8s.ing.he-arc.ch/bachelors).
Normalement, la liste des travaux de bachelors s'affiche, les TB sont affichés par ordre décroissant par ordre d'ajout. L'utilisateur peut filtrer l'affichage des TB en fonction des tags.

### Page d'enregistrement BDD
Pour l'enregistrement de nouvelles entrées dans la base de données, dans notre application, correspond l'ajout d'un nouveau travail de diplôme.
Pour ce faire, il faut cliquer sur se rendre sous "Ajouter un travail de bachelor" (toujours depuis la page de la liste des TB). Ensuite, il faut compléter le formulaire.
Après avoir saisies les données, l'utilisateur est redirigé vers la page de la liste des TB.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Rendu final

Les visiteurs ont accès à la page d'accueil, de connexion et d'inscription. Ils ne peuvent donc pas tester ni avoir
accès aux fonctionnalités de l'application s'ils ne s'inscrivent ou ne se connectent pas.

### Compte enseignant
Un visiteur peut s'inscrire en tant qu'enseignant ou se connecter à son compte enseignant. Un enseignant peut : 
- Voir la liste des bachelors proposés et l'utilisateur peut filtrer l'affichage des TB en fonction des tags,
- Ajouter un nouveau bachelor,
- Modifier un bachelor qu'il a ajouté,
- Supprimer un bachelor qu'il a ajouté

**A noter** que les opérations de modifications et de suppressions des bachelors s'appliquent pour tous les enseignants et tous les étudiants.
Un bachelor supprimé ne sera plus visible dans la liste des bachelors proposés et également dans la liste des bachelors choisit par un étudiant.

> Améliorations possibles (front)
> - Dans l'idéal, il faudrait qu'un administrateur système créer le compte de l'enseignant en amount et qu'il ne soit possible de s'inscrire en tant qu'enseignant ou il faudrait qu'il y ait une vérification manuelle si un utilisateur s'inscrit en tant qu'enseignant
> - Pour faciliter la gestion des bachelors entrés, il faudrait que les enseignants est une page qui leur permettent de modifier / supprimer les bachelors qu'ils ont ajoutés

### Compte étudiant
Un visiteur peut s'inscrire en tant qu'étudient ou se connecter à son compte étudiant. Un étudiant peut:
- Voir la liste des bachelors proposés et l'utilisateur peut filtrer l'affichage des TB en fonction des tags,
- Ajouter un bachelor dans sa liste de sélection
- Retirer un bachelor de sa liste de sélection


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

* Stéphane Oguey - [github@stephane-og](https://github.com/stephane-og) - [stephane.oguey@he-arc.ch](mailto:stephane.oguey@he-arc.ch?subject=[GitHub]%20Bachelor)
* Loïc Santschi - [github@loisama](https://github.com/loisama) - [loic.santschi@he-arc.ch](mailto:loic.santschi@he-arc.ch?subject=[GitHub]%20Bachelora)
* Miranda Fleury - [github@ClawdeenFleury](https://github.com/ClawdeenFleury) - [miranda.fleury@he-arc.ch](mailto:miranda.fleury@he-arc.ch?subject=[GitHub]%20Bachelora)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [Google Fonts and icons](https://fonts.google.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/HE-Arc/Bachelora.svg?style=for-the-badge
[contributors-url]: https://github.com/HE-Arc/Bachelora/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/HE-Arc/Bachelora.svg?style=for-the-badge
[forks-url]: https://github.com/HE-Arc/Bachelora/forks
[stars-shield]: https://img.shields.io/github/stars/HE-Arc/Bachelora.svg?style=for-the-badge
[stars-url]: https://github.com/HE-Arc/Bachelora/stargazers
[issues-shield]: https://img.shields.io/github/issues/HE-Arc/Bachelora.svg?style=for-the-badge
[issues-url]: https://github.com/HE-Arc/Bachelora/issues
[Django.com]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[Django-url]: https://www.djangoproject.com
[Figma.com]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white
[Figma-url]: https://www.figma.com/fr/about/
[Quasar.com]: https://img.shields.io/badge/Quasar-1976D2?style=for-the-badge&logo=quasar&logoColor=white
[Quasar-url]: https://quasar.dev
[Vuejs.com]: https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vuejs-url]: https://vuejs.org

