const LabelModel = require("../models/label.model");
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

	filterLabelNames = async (labelObject) => {
		let newLabelArray = [];

		if (labelObject.length) {

			// Filter label name properties from Label obj, create new Label docs where required and push to props obj
			const labelNames = labelObject.filter(label => label.name);

			if (labelNames.length) {
				for (let index = 0; index < labelNames.length; index++) {

					// Check if Alias Name matches existing Artist in database
					const labelCheck = await LabelModel.find({ name: labelNames[index].name }).exec();

					if (!labelCheck.length) {
						// If Label name doesn't exist, create new Label Document and push new Id to appropriate Label array
						const name = await LabelModel.create(labelNames[index]);
						newLabelArray.push({ _id: name._id });
					} else {
						// If Label name does exist, push the Label Id to appropriate Label array
						labelCheck.forEach(label => {
							newLabelArray.push({_id: label._id});
						})
					}
				}
			}

			// Filter label id properties from artist obj and push to props obj
			const labelIds = labelObject.filter(label => label._id);

			if (labelIds.length) {
				labelIds.forEach(labelId => {
					newLabelArray.push({ _id: labelId._id });
				})
			}
		}
		return newLabelArray;
	}

	props.parentLabel = await filterLabelNames(label.parentLabel);
	props.subsidiaryLabel = await filterLabelNames(label.subsidiaryLabel);

	return props;
}

//===============================================================================================================//

module.exports = LabelUtilities;
