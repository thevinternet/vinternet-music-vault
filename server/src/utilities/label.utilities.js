const LabelModel = require("../models/label.model");
const DocumentUtilities = require("../utilities/document.utilities");
const LabelUtilities = {}

//===============================================================================================================//
// Utility - Create Label Document (Managing Linked Parent & Subsidiary Labels)
//===============================================================================================================//

LabelUtilities.createLabelDocument = async (label) => {

	const props = {
		labelName: label.labelName,
		parentLabel: [],
		subsidiaryLabel: [],
		profile: label.profile,
		website: label.website,
		discogsId: label.discogsId,
	}

	// Create linked Parent & Subsidiary Label data properties
	props.parentLabel = await DocumentUtilities.manageLinkedData(label.parentLabel, LabelModel);
	props.subsidiaryLabel = await DocumentUtilities.manageLinkedData(label.subsidiaryLabel, LabelModel);

	return props;
}

//===============================================================================================================//

module.exports = LabelUtilities;
