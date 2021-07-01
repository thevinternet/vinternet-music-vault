const ReleaseModel = require("../models/release.model");
const { body, param, validationResult } = require('express-validator');
const ReleaseUtilties = require("../utilities/release.utilities");
const ReleaseController = {};

//===============================================================================================================//
// Controller - Validate Release Input Data (Express Validator Middleware)
//===============================================================================================================//

//TODO: Handle Validation of Tracks object array

ReleaseController.validate = (method) => {
	switch (method) {	
		case "checkReleaseId": {
			return [
				param("id")
					.isMongoId()
					.withMessage("The value passed for Release Id is not valid")
			]
		}
		case "checkReleaseInput": {
			return [
				body("release._id")
					.optional().isMongoId()
					.withMessage("The value for the Release Id provided is not valid"),
				body("release.releaseTitle")
					.notEmpty().escape().trim()
					.withMessage("Please provide the name of the release"),
				body("release.labelName")
					.isArray()
					.withMessage("Label array is malformed and not valid"),
				body("release.labelName.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Label Id provided is not valid"),
				body("release.labelName.*.name")
					.optional().escape().trim(),
				body("release.catalogue")
					.optional().escape().trim(),
				body("release.year")
					.optional().escape().trim(),
				body("release.format")
					.isArray()
					.withMessage("Format array is malformed and not valid"),
				body("release.format.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Format Id provided is not valid"),
				body("release.format.*.name")
					.notEmpty().escape().trim()
					.withMessage("Please provide the name/type of the media format"),
				body("release.format.*.released")
					.optional().escape().trim(),
				body("label.discogsUrl")
					.optional().escape().trim(),
				body("label.discogsId")
					.optional().escape().trim()
			]
		}
	}
}

//===============================================================================================================//
// Controller - Retrieve All Releases
//===============================================================================================================//

ReleaseController.getAllReleases = async (req, res, next) => {
	try {
		const releases = await ReleaseModel.getAllReleases();

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(releases);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve Single Release By Id
//===============================================================================================================//

ReleaseController.getReleaseById = async (req, res, next) => {
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
		let release = await ReleaseModel.getReleaseById(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(release);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve All Releases By Label Id
//===============================================================================================================//

ReleaseController.getReleasesByLabel = async (req, res, next) => {
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
		let releases = await ReleaseModel.getReleasesByLabel(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(releases);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve All Releases By Artist Id
//===============================================================================================================//

ReleaseController.getReleasesByArtist = async (req, res, next) => {
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
		let releases = await ReleaseModel.getReleasesByArtist(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(releases);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Create New Release With Text Properties & Image File
//===============================================================================================================//

ReleaseController.createNewRelease = async (req, res, next) => {
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

		// If release title already exists return error object
		const releaseCheck = await ReleaseModel.find({ title: req.body.release.releaseTitle }).exec();

		if (releaseCheck.length) {
			return res.json({
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: req.body.release.releaseTitle,
							msg: "The release title provided is already in the database",
							param: "releaseTitle",
							location: "body"
						}
					]
				}
			});
		}

		// If all checks pass prepare release object with linked properties 
		const props = await ReleaseUtilties.createReleaseDocument(req.body.release);

		// Prepare release picture object
		let file;
		if (req.file) {
			file = {
				location: req.file.filename,
				filename: req.file.originalname,
				format: req.file.mimetype
			}
		} else {
			file = {
				location: "avatar.jpg",
				filename: "avatar.jpg",
				format: "image/jpeg"
			}
		}

		// Submit release object to model and handle response
		const release = await ReleaseModel.createNewRelease(props, file);

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
							msg: `${release.title} successfully added`,
							value: release
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
// Controller - Update Release Text Properties & Image File By Id
//===============================================================================================================//

ReleaseController.updateExistingReleaseById = async (req, res, next) => {
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

		// If release id does not exist return error object
		const id = req.params.id;
		const releaseCheck = await ReleaseModel.find({ _id: id }).exec();

		if (!releaseCheck.length) {
			return res.json({
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: req.body.id,
							msg: "The release id provided was not found",
							param: "id",
							location: "body"
						}
					]
				}
			});
		}

		// If all checks pass prepare release object with linked properties 
		const props = await ReleaseUtilties.createReleaseDocument(req.body.release);

		// Handle optional picture file and append to release object
		if (req.file) {
			props.picture = {
				location: req.file.filename,
				filename: req.file.originalname,
				format: req.file.mimetype
			}
		}

		// Submit release object to model and handle response
		const release = await ReleaseModel.updateExistingReleaseById(id, props);

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
							msg: `${props.releaseTitle} successfully updated`,
							value: release
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
// Controller - Remove Single Release By Id
//===============================================================================================================//

ReleaseController.removeReleaseById = async (req, res, next) => {
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
		const release = await ReleaseModel.removeReleaseById(id)

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
							msg: `Release removed from database`,
							value: release
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

module.exports = ReleaseController;
