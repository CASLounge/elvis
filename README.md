<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/lozanasc-projects/CASLounge">
    <img src="./logo-api.png" alt="Logo" height="80">
  </a>

  <h3 align="center">CASLounge API</h3>

  <p align="center">
    Backend service responsible for CASLounge via Web API's.
    <br />
    <br />
    <a href="">Demo not available</a>
    ·
    <a href="https://github.com/lozanasc-projects/CASLounge/issues">Report Bug</a>
    ·
    <a href="https://github.com/lozanasc-projects/CASLounge/issues">Request Feature</a>
  </p>
</p>
<br/>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Backend application that handles database queries and authentication for CASLounge applications

### Built With

This system was built with the following technologies:  

* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Supabase (PostgreSQL Db Hosting)](https://supabase.com/docs/)
* [NodeJS](https://nodejs.dev/)  

<!-- GETTING STARTED -->
## Getting Started

Hey there! You might be new to nodejs, just follow the instructions below and you'll running the project in no time! ✨

### Prerequisites

Let's start with the prerequisites, make sure you have the following installed in your local machine:  

* [nodejs](https://nodejs.org/en/)

  ```sh
  # To check if its installed
  node -v
  ```  

* [yarn](https://nodejs.org/en/)

  ```sh
  npm install yarn@latest -g
  ```  

### Installation  

* Clone the repository

  ```sh
   # Clone the repo
   git clone https://github.com/lozanasc-projects/CASLounge.git
   cd ./caslounge/elvis
   ```  

* [Download PostgreSQL client with pgAdmin 4 here](https://www.postgresql.org/download/)  

* Install dependencies and database migration

  ```sh
  # Dependencies
  yarn install

  # Migration
  # note: dev is for local development only!
  yarn prisma migrate dev
  ```


<br/>

<!-- USAGE EXAMPLES -->
## Usage

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/lozanasc-projects/CASLounge/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Sean Christian Lozana - [@devzana](https://twitter.com/devzana) - lozanasc@gmail.com

Project Link: [CASLounge](https://github.com/lozanasc-projects/CASLounge)
