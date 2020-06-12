# Vinternet Music Vault (Frontend React Client)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is designed to run alongside the backend server API.

If you do wish to spin up the frontend [React][reactjs] client in isolation you can run it via a [Docker][docker] container or locally in your [Node][nodejs] development environment.

---

## Setup & Usage With Docker (Default)

### Requirements

- [Docker](https://www.docker.com/get-started)

### Running Standalone React Client (Development)

1. Build the React client Docker image by running `docker build -t vmv-client .` from the [/client](/client) directory in the command line.
2. Run the React client Docker container  by running `docker run -p 3000:3000 vmv-client`  from the [/client](/client) directory in the command line.
3. Browse to [http://localhost:3000](http://localhost:3000) to view application in your chosen browser.

---

## Setup & Usage On Local Node Environment

### Requirements

- [NodeJS][nodejs] 12.0.0 and above
- [Yarn][yarn] (you can still use npm if you wish)

### Running Standalone React Client (Development)

1. Install dependencies by running `yarn install` from the [/client](/client) directory in the command line.
2. In the [/client](/client) directory create your own `.env` file (see `.env.client.example` for guidance).
    > Ensure to set `REACT_APP_SERVER_PROXY_HOST=http://localhost` variable.
3. To build and initiate the frontend React client run `yarn start` from the [/client](/client) directory in the command line.
4. Browse to [http://localhost:3000](http://localhost:3000) to view application in your chosen browser.

[docker]: https://www.docker.com
[nodejs]: https://nodejs.org
[reactjs]: https://reactjs.org
[yarn]: https://yarnpkg.com
