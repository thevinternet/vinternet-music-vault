const LabelModel = require("../schemas/label.schema");

//===============================================================================================================//
// Return ALL documents in Labels collection
//===============================================================================================================//

LabelModel.getAllLabels = async () => {
	try {
		const labels = await LabelModel.find({});

		if (!labels.length) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							msg: "No label results found"
						}
					]
				}
			}
		} else {
			return LabelModel.find({}).lean().sort("name").exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database (Mongoose): ${err.name}`,
				errors: [
					{
						msg: err.message
					}
				]
			}
		}
	}
}

//===============================================================================================================//
// Return Label Document by ID
//===============================================================================================================//

LabelModel.getLabelById = async (id) => {
	try {
		const label = await LabelModel.findById(id);

		if (label === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The label Id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return LabelModel.findById(id).lean().populate("parent_label", "name").populate("subsidiary_label", "name").exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database (Mongoose): ${err.name}`,
				errors: [
					{
						msg: err.message
					}
				]
			}
		}
	}
}

//===============================================================================================================//
// Create New Label Document
//===============================================================================================================//

LabelModel.createNewLabel = async (props, file) => {
	try {
		const label = await LabelModel.create({
			name: props.labelName,
			parent_label: props.parentLabel,
			subsidiary_label: props.subsidiaryLabel,
			profile: props.profile,
			website: props.website,
			discogs_id: props.discogsId,
			picture: file
		});

		return label;

	} catch (err) {
		return {
			error : {
				status: `Database (Mongoose): ${err.name}`,
				errors: [
					{
						msg: err.message
					}
				]
			}
		}
	}
}

//===============================================================================================================//
// Update Existing Label Document
//===============================================================================================================//

LabelModel.updateExistingLabelById = async (id, props) => {
	
	// Create 'Set' Object with updated Label Props and optional Image File
	const labelUpdateProps = {
		$set: {
			name: props.labelName,
			parent_label: props.parentLabel,
			subsidiary_label: props.subsidiaryLabel,
			profile: props.profile,
			website: props.website,
			discogs_id: props.discogsId,
		}
	}
	if (props.picture) {
		labelUpdateProps.$set.picture = props.picture;
	}

	// Submit label update object to model and handle response
	try {
		const label = await LabelModel.updateOne(
			{ _id: id },
			labelUpdateProps,
			{ new: true }
		);

		return label;

	} catch (err) {
		return {
			error : {
				status: `Database (Mongoose): ${err.name}`,
				errors: [
					{
						msg: err.message
					}
				]
			}
		}
	}
}

//===============================================================================================================//
// // Remove Label By Id
//===============================================================================================================//

LabelModel.removeLabelById = async (id) => {
	try {
		const label = await LabelModel.findById(id);

		if (label === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The label id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return LabelModel.deleteOne({ _id: id }).exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database (Mongoose): ${err.name}`,
				errors: [
					{
						msg: err.message
					}
				]
			}
		}
	}
}

//===============================================================================================================//

module.exports = LabelModel;
