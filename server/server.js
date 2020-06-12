const express = require("express");
const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const artistRouter = require("./src/routes/artist.routes");
const labelRouter = require("./src/routes/label.routes");
const releaseRouter = require("./src/routes/release.routes");

//===============================================================================================================//

// Initiate environment variables

dotenv.config();

const {
  MONGO_HOST_LOCATION,
  MONGO_DATABASE,
  MONGO_PORT,
  SERVER_PORT
} = process.env;

//===============================================================================================================//

// Initiate Bodyparser middleware

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//===============================================================================================================//

// Initiate Mongoose connection to MongoDB

mongoose
  .connect(`mongodb://${MONGO_HOST_LOCATION}:${MONGO_PORT}/${MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`successfully connected to ${MONGO_DATABASE}`);
  })
  .catch(() => {
    console.log("error connecting to database");
  });

//===============================================================================================================//

// Initiate response headers for CORS control

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain if required
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "*"); // enables all the methods to take place
  return next();
});

//===============================================================================================================//

// Initiate API application route URLs

app.use("/api/artist", artistRouter);
app.use("/api/label", labelRouter);
app.use("/api/release", releaseRouter);

//===============================================================================================================//

// Initiate server listening port

app.listen(SERVER_PORT, () =>
  console.log(`listening on port: ${SERVER_PORT}`)
);
