const express = require("express");
const router = express.Router();

const TrackController = require("../controllers/track.controller");

//===============================================================================================================//
// Routes - All Release [GET] Routes
//===============================================================================================================//

// [GET] All Tracks Endpoint
router.get("/", TrackController.getAllTracks);

// [GET] Single Track By Id Endpoint
router.get("/:id", TrackController.validate("checkTrackId"), TrackController.getTrackById);

// [GET] All Tracks By Artist Id Endpoint
router.get("/artist/:id", TrackController.validate("checkTrackId"), TrackController.getTracksByArtist);

// [GET] All Tracks By Label Id Endpoint
router.get("/label/:id", TrackController.validate("checkTrackId"), TrackController.getTracksByLabel);

// [GET] All Tracks By Release Id Endpoint
router.get("/release/:id", TrackController.validate("checkTrackId"), TrackController.getTracksByRelease);

//===============================================================================================================//
// Routes - All Release [DELETE] Routes
//===============================================================================================================//

// [DELETE] Track By Id
router.delete("/:id", TrackController.validate("checkTrackId"), TrackController.removeTrackById);

//===============================================================================================================//

module.exports = router;
