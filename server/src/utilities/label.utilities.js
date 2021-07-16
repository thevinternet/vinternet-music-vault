const LabelModel = require("../models/label.model");
const DocumentUtilities = require("../utilities/document.utilities");
const LabelUtilities = {}

//===============================================================================================================//
// Utility - Create Label Document (Managing Linked Parent & Subsidiary Labels)
//===============================================================================================================//

LabelUtilities.createLabelDocument = async (label) => {

	const props = {
		name: label.name,
		profile: label.profile,
		website: label.website,
		discogs_id: label.discogs_id,
	}

	// Create linked Parent & Subsidiary Label data properties
	props.parent_label = await DocumentUtilities.manageLinkedData(label.parent_label, LabelModel);
	props.subsidiary_label = await DocumentUtilities.manageLinkedData(label.subsidiary_label, LabelModel);

	return props;
}

//===============================================================================================================//

module.exports = LabelUtilities;
