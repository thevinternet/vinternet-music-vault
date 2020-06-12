# Vinternet Music Vault (Standalone Server API)

## Setup & Usage With Docker (Default)

### Requirements

- [Docker](https://www.docker.com/get-started)
- [MongoDB][mongodb] (only if you want to run your own local database instance)

### Running Standalone Server API (Development)

1. Navigate to the [/server](/server) directory and create your own `.env` file (see `.env.server.example` for guidance).
2. Navigate to the [/server](/server) directory and locate the 'docker-compose.yml' file.
3. To build and initiate the standalone server API run `docker-compose up --build` from the [/server](/server) directory in the command line.
4. Use [http://localhost:8000](http://localhost:8000) to interact with the API via your chosen browser or API development platform.

---

## Setup & Usage On Local Node Environment

### Requirements

- [NodeJS][nodejs] 12.0.0 and above
- [MongoDB][mongodb]

### Running Standalone Server API (Development)

1. Install server dependencies by running `npm install` from the [/server](/server) directory in the command line.
2. Navigate to the [/server](/server) directory and create your own `.env` file (see `.env.server.example` for guidance).
    > Ensure to set `MONGO_HOST_LOCATION=localhost` variable.
3. To build and initiate the backend server API run `npm run development` from the [/server](/server) directory in the command line.
4. Use [http://localhost:8000](http://localhost:8000) to interact with the API via your chosen browser or API development platform.

[docker]: https://www.docker.com
[mongodb]: https://www.mongodb.com
[nodejs]: https://nodejs.org
