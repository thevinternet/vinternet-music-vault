# Vinternet Music Vault

A MERN stack application built using [Node][nodejs], [Express][expressjs], [MongoDB][mongodb] and [React][reactjs] for managing a personal music collection (similar to that of [Discogs][discogs]). It uses [Redux][reduxjs] for client side state management and is containerised using [Docker][docker] for OS portability.

This project is built around my personal requirements and currently allows a user to view, create, edit and delete artists, labels, releases and tracks. Development on this application is ongoing with new features and improvements being added regularly.  

---

## Setup & Usage With Docker (Default)

### Requirements

- [Docker](https://www.docker.com/get-started)
- [MongoDB][mongodb] (only if you want to run your own local database instance)

### Running Full Application (Development)

1. Navigate to the [/server](/server) directory and create your own `.env` file (see `.env.server.example` for guidance).
2. Navigate to the [/client](/client) directory and create your own `.env` file (see `.env.client.example` for guidance).
3. Navigate to the root directory and locate the 'docker-compose.yml' file (based upon the docker-compose.dev.yml file by default).
4. Build and initiate the full application run `docker-compose up --build` from the root directory in the command line.
5. Browse to [http://localhost:3000](http://localhost:3000) to view application in your chosen browser.

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
- [Yarn][yarn] (you can still use npm if you wish)

### Running Full Application (Development)

1. Install server dependencies by running `npm install` from the [/server](/server) directory in the command line.
2. Install client dependencies by running `yarn install` from the [/client](/client) directory in the command line.
3. Navigate to the [/server](/server) directory and create your own `.env` file (see `.env.server.example` for guidance).
    > Ensure to set `MONGO_HOST_LOCATION=localhost` variable.
4. Navigate to the [/client](/client) directory and create your own `.env` file (see `.env.client.example` for guidance).
    > Ensure to set `REACT_APP_SERVER_PROXY_HOST=http://localhost` variable.
5. To build and initiate the backend server API run `npm run development` from the [/server](/server) directory in the command line.
6. To build and initiate the frontend React client run `yarn start` from the [/client](/client) directory on a seperate terminal.
7. Browse to [http://localhost:3000](http://localhost:3000) to view application in your chosen browser.

### Running Standalone Server API (Development)

1. Install server dependencies by running `npm install` from the [/server](/server) directory in the command line.
2. Navigate to the [/server](/server) directory and create your own `.env` file (see `.env.server.example` for guidance).
    > Ensure to set `MONGO_HOST_LOCATION=localhost` variable.
3. To build and initiate the backend server API run `npm run development` from the [/server](/server) directory in the command line.
4. Use [http://localhost:8000](http://localhost:8000) to interact with the API via your chosen browser or API development platform.

---

## Browser Support

This application performs as expected across all evergreen browsers (Firefox, Chrome, Edge, Safari, etc).

## Contributing

If you wish to submit a bug fix or feature, you can create a pull request and it will be merged pending a code review.

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

[discogs]: https://www.discogs.com
[docker]: https://www.docker.com
[expressjs]: https://expressjs.com
[mongodb]: https://www.mongodb.com
[nodejs]: https://nodejs.org
[reactjs]: https://reactjs.org
[reduxjs]: https://redux.js.org
[yarn]: https://yarnpkg.com
