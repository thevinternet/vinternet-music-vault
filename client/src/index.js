import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import artistReducer from "./store/reducers/artist";
import labelReducer from "./store/reducers/label";
import releaseReducer from "./store/reducers/release";

import { watchArtist, watchLabel, watchRelease } from "./store/sagas";

//===============================================================================================================//

// Combine Redux Reducers into single object
const rootReducer = combineReducers({
  artist: artistReducer,
  label: labelReducer,
  release: releaseReducer
});

// Setup Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Set Redux dev tools in development mode only
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

// Create & configure Redux store with reducers and middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

// Call Redux Saga middleware functions
sagaMiddleware.run(watchArtist);
sagaMiddleware.run(watchLabel);
sagaMiddleware.run(watchRelease);

//===============================================================================================================//

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

//===============================================================================================================//

ReactDOM.render(application, document.getElementById("root"));

//===============================================================================================================//

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
