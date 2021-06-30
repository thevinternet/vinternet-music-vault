var LabelModel = require("../models/label.model");
const { body, param, validationResult } = require('express-validator');
const LabelUtilities = require("../utilities/label.utilities");
const LabelController = {};

//===============================================================================================================//
// Controller - Validate Label Input Data (Express Validator Middleware)
//===============================================================================================================//

LabelController.validate = (method) => {
	switch (method) {	
		case "checkLabelId": {
			return [
				param("id")
					.isMongoId()
					.withMessage("The value passed for Label Id is not valid")
			]
		}
		case "checkLabelInput": {
			return [
				body("label._id")
					.optional().isMongoId()
					.withMessage("The value for the Label Id provided is not valid"),
				body("label.labelName")
					.notEmpty().escape().trim()
					.withMessage("Please provide the name of the label"),
				body("label.parentLabel")
					.isArray()
					.withMessage("Parent Label array is malformed and not valid"),
				body("label.parentLabel.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Parent Label Id provided is not valid"),
				body("label.parentLabel.*.name")
					.optional().escape().trim(),
				body("label.subsidiaryLabel")
					.isArray()
					.withMessage("Subsidiary Label array is malformed and not valid"),
				body("label.subsidiaryLabel.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Subsidiary Label Id provided is not valid"),
				body("label.subsidiaryLabel.*.name")
					.optional().escape().trim(),
				body("label.profile")
					.optional().escape().trim(),
				body("label.website")
					.isArray({ min: 5 })
					.withMessage("Website array is malformed and not valid"),
				body("label.website.*._id")
					.isMongoId().optional()
					.withMessage("The value for the Website Id provided is not valid"),
				body("label.website.*.name")
					.notEmpty().escape().trim()
					.withMessage("Please provide the name of the website"),
				body("label.website.*.url")
					.optional().escape().trim(),
				body("label.discogsId")
					.optional().escape().trim()
			]
		}
	}
}

//===============================================================================================================//
// Controller - Retrieve All Labels
//===============================================================================================================//

LabelController.getAllLabels = async (req, res, next) => {
	try {
		const labels = await LabelModel.getAllLabels();

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(labels);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Retrieve Single Label By Id
//===============================================================================================================//

LabelController.getLabelById = async (req, res, next) => {
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
		let label = await LabelModel.getLabelById(id);

		if (res.error) {
			return res.json({
				error: {
					status: res.error.status,
					errors: res.error.errors
				}
			});
		} else {
			return res.json(label);
		}
	} catch(err) {
		return next(err)
	}
}

//===============================================================================================================//
// Controller - Create New Label With Text Properties & Image File
//===============================================================================================================//

LabelController.createNewLabel = async (req, res, next) => {
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

		// If label name already exists return error object
		const labelCheck = await LabelModel.find({ name: req.body.label.labelName }).exec();

		if (labelCheck.length) {
			return res.json({
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: req.body.label.labelName,
							msg: "The label name provided is already in the database",
							param: "labelName",
							location: "body"
						}
					]
				}
			});
		}

		// If all checks pass prepare label object with linked properties 
		const props = await LabelUtilities.createLabelDocument(req.body.label);

		// Prepare label picture object
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

		// Submit label object to model and handle response
		const label = await LabelModel.createNewLabel(props, file);

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
							msg: `${label.name} successfully added`,
							value: label
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
// Controller - Update Label Text Properties & Image File By Id
//===============================================================================================================//

LabelController.updateExistingLabelById = async (req, res, next) => {
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

		// If label id does not exist return error object
		const id = req.params.id;
		const labelCheck = await LabelModel.find({ _id: id }).exec();

		if (!labelCheck.length) {
			return res.json({
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: req.body.id,
							msg: "The label id provided was not found",
							param: "id",
							location: "body"
						}
					]
				}
			});
		}

		// If all checks pass prepare label object with linked properties 
		const props = await LabelUtilities.createLabelDocument(req.body.label);

		// Handle optional picture file and append to label object
		if (req.file) {
			props.picture = {
				location: req.file.filename,
				filename: req.file.originalname,
				format: req.file.mimetype
			}
		}

		// Submit label object to model and handle response
		const label = await LabelModel.updateExistingLabelById(id, props);

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
							msg: `${props.labelName} successfully updated`,
							value: label
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
// Controller - Remove Single Label By Id
//===============================================================================================================//

LabelController.removeLabelById = async (req, res, next) => {
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
		const label = await LabelModel.removeLabelById(id)

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
							msg: `Label removed from database`,
							value: label
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

module.exports = LabelController;
