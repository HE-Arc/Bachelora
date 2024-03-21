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
[![MIT License][license-shield]][license-url]

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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
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

> Start backend server
   ```sh
   pipenv manage.py runserver
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

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

* Stéphane Oguey - [github@ylked](https://github.com/stephane-og) - [stephane.oguey@he-arc.ch](mailto:stephane.oguey@he-arc.ch?subject=[GitHub]%20Bachelor)
* Loïc Santschi - [github@lugopi](https://github.com/loisama) - [loic.santschi@he-arc.ch](mailto:loic.santschi@he-arc.ch?subject=[GitHub]%20Bachelora)
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
[license-shield]: https://img.shields.io/badge/license-MIT-green?style=for-the-badge
[license-url]: https://github.com/HE-Arc/Bachelora/blob/main/LICENSE
[Django.com]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[Django-url]: https://www.djangoproject.com
[Figma.com]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white
[Figma-url]: https://www.figma.com/fr/about/
[Quasar.com]: https://img.shields.io/badge/Quasar-1976D2?style=for-the-badge&logo=quasar&logoColor=white
[Quasar-url]: https://quasar.dev
[Vuejs.com]: https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vuejs-url]: https://vuejs.org

