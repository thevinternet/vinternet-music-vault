const ArtistModel = require("../models/artist.model");
const { body, param, validationResult } = require('express-validator');
const ArtistUtilities = require("../utilities/artist.utilities");
const ArtistController = {};

//===============================================================================================================//
// Controller - Validate Artist Input Data (Express Validator Middleware)
//===============================================================================================================//

ArtistController.validate = (method) => {
	switch (method) {	
		case "checkArtistId": {
			return [
				param("id")
					.isMongoId()
					.withMessage("The value passed for Artist Id is not valid")
			]
		}
		case "checkArtistInput": {
			return [
				body("artist._id")
					.optional().isMongoId()
					.withMessage("The value for the Artist Id provided is not valid"),
				body("artist.name")
					.notEmpty().escape().trim()
					.withMessage("Please provide the name of the artist"),
				body("artist.real_name")
					.optional().escape().trim(),
				body("artist.alias_name")
					.isArray()
					.withMessage("Alias Name array is malformed and not valid"),
				body("artist.alias_name.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Alias Name Id provided is not valid"),
				body("artist.alias_name.*.name")
					.optional().escape().trim(),
				body("artist.profile")
					.optional().escape().trim(),
				body("artist.website")
					.isArray({ min: 5 })
					.withMessage("Website array is malformed and not valid"),
				body("artist.website.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Website Id provided is not valid"),
				body("artist.website.*.name")
					.notEmpty().escape().trim()
					.withMessage("Please provide the name of the website"),
				body("artist.website.*.url")
					.optional().escape().trim(),
				body("artist.discogs_id")
					.optional().escape().trim()
			]
		}
	}
}

//===============================================================================================================//
// Controller - Retrieve All Artists
//===============================================================================================================//

ArtistController.getAllArtists = async (req, res, next) => {
	try {
		const artists = await ArtistModel.getAllArtists();

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(artists);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve Single Artist By Id
//===============================================================================================================//

ArtistController.getArtistById = async (req, res, next) => {
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
		let artist = await ArtistModel.getArtistById(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(artist);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Create New Artist With Text Properties & Image File
//===============================================================================================================//

ArtistController.createNewArtist = async (req, res, next) => {
	try {
		// If validation errors in request return error object
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

		// If artist name already exists return error object
		const artistCheck = await ArtistModel.find({ name: req.body.artist.name }).exec();

		if (artistCheck.length) {
			return res.json({
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: req.body.artist.name,
							msg: "The artist name provided is already in the database",
							param: "name",
							location: "body"
						}
					]
				}
			});
		}

		// If all checks pass prepare artist object with linked properties 
		const props = await ArtistUtilities.createArtistDocument(req.body.artist);

		// Prepare artist picture object
		let file;
		if (req.file) {
			file = [{
				location: req.file.filename,
				filename: req.file.originalname,
				format: req.file.mimetype
			}]
		} else {
			file = [{
				location: "avatar.jpg",
				filename: "avatar.jpg",
				format: "image/jpeg"
			}]
		}

		// Submit artist object to model and handle response
		const artist = await ArtistModel.createNewArtist(props, file);

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
							msg: `${artist.name} successfully added`,
							value: artist
						}
					]
				}
			});
		}
	} catch(err) {
		return next(err)
	}
};

//===============================================================================================================//
// Controller - Update Artist Text Properties & Image File By Id
//===============================================================================================================//

ArtistController.updateExistingArtistById = async (req, res, next) => {
	try {
		// If validation errors in request return error object
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

		// If artist id does not exist return error object
		const id = req.params.id;
		const artistCheck = await ArtistModel.find({ _id: id }).exec();

		if (!artistCheck.length) {
			return res.json({
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: req.body.id,
							msg: "The artist id provided was not found",
							param: "id",
							location: "body"
						}
					]
				}
			});
		}

		// If all checks pass prepare artist object with linked properties 
		const props = await ArtistUtilities.createArtistDocument(req.body.artist);

		// Handle optional picture file and append to artist object
		if (req.file) {
			props.picture = [{
				location: req.file.filename,
				filename: req.file.originalname,
				format: req.file.mimetype
			}]
		}

		// Submit artist object to model and handle response
		const artist = await ArtistModel.updateExistingArtistById(id, props);

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
							msg: `${props.name} successfully updated`,
							value: artist
						}
					]
				}
			});
		}
	} catch(err) {
		return next(err)
	}
};

//===============================================================================================================//
// Controller - Remove Single Artist By Id
//===============================================================================================================//

ArtistController.removeArtistById = async (req, res, next) => {
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
		const artist = await ArtistModel.removeArtistById(id)

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
							msg: `Artist removed from database`,
							value: artist
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

module.exports = ArtistController;
