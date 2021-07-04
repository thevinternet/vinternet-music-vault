const TrackModel = require("../models/track.model");
const { param, validationResult } = require('express-validator');
const TrackController = {};

//===============================================================================================================//
// Controller - Validate Release Input Data (Express Validator Middleware)
//===============================================================================================================//

TrackController.validate = (method) => {
	switch (method) {	
		case "checkTrackId": {
			return [
				param("id")
					.isMongoId()
					.withMessage("The value passed for the Id is not valid")
			]
		}
	}
}

//===============================================================================================================//
// Controller - Retrieve All Tracks
//===============================================================================================================//

TrackController.getAllTracks = async (req, res, next) => {
	try {
		const tracks = await TrackModel.getAllTracks();

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(tracks);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve Single Track By Id
//===============================================================================================================//

TrackController.getTrackById = async (req, res, next) => {
	try {
		// Check for validation errors in request and return error object
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.json({ 
				error: {
					status: "Request Failed",
					response: "HTTP Status Code 422 (Unprocessable Entities)",
					errors: errors.array()
				}
			});
		}

		// If no validation errors run query request and return result
		const id = req.params.id;
		let track = await TrackModel.getTrackById(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(track);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve All Tracks By Artist Id
//===============================================================================================================//

TrackController.getTracksByArtist = async (req, res, next) => {
	try {
		// Check for validation errors in request and return error object
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.json({ 
				error: {
					status: "Request Failed",
					response: "HTTP Status Code 422 (Unprocessable Entities)",
					errors: errors.array()
				}
			});
		}

		// If no validation errors run query request and return result
		const id = req.params.id;
		let tracks = await TrackModel.getTracksByArtist(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(tracks);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve All Tracks By Label Id
//===============================================================================================================//

TrackController.getTracksByLabel = async (req, res, next) => {
	try {
		// Check for validation errors in request and return error object
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.json({ 
				error: {
					status: "Request Failed",
					response: "HTTP Status Code 422 (Unprocessable Entities)",
					errors: errors.array()
				}
			});
		}

		// If no validation errors run query request and return result
		const id = req.params.id;
		let tracks = await TrackModel.getTracksByLabel(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(tracks);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve All Tracks By Release Id
//===============================================================================================================//

TrackController.getTracksByRelease = async (req, res, next) => {
	try {
		// Check for validation errors in request and return error object
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.json({ 
				error: {
					status: "Request Failed",
					response: "HTTP Status Code 422 (Unprocessable Entities)",
					errors: errors.array()
				}
			});
		}

		// If no validation errors run query request and return result
		const id = req.params.id;
		let tracks = await TrackModel.getTracksByRelease(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(tracks);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Remove Single Track By Id
//===============================================================================================================//

TrackController.removeTrackById = async (req, res, next) => {
	try {
		// Check for validation errors in request and return error object
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.json({ 
				error: {
					status: "Request Failed",
					response: "HTTP Status Code 422 (Unprocessable Entities)",
					errors: errors.array()
				}
			});
		}

		// If no validation errors run query request and return result
		const id = req.params.id;
		const track = await TrackModel.removeTrackById(id)

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json({
				success: {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					feedback: [
						{
							msg: `Track removed from database`,
							value: track
						}
					]
				}
			});
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//

module.exports = TrackController;
