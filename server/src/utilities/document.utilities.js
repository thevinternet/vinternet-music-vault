const DocumentUtilities = {}

//===============================================================================================================//
// Utility - Manage & Create Linked Data Between Artists, Labels, Releases & Tracks
//===============================================================================================================//

DocumentUtilities.manageLinkedData = async (dataObjectArray, dataModel) => {

	let linkedDataArray = [];

	if (dataObjectArray.length) {

		// Filter Name properties from dataObjectArray, create new Database Document where required and push new props to linkedDataArray
		const dataNames = dataObjectArray.filter(dataObj => dataObj.name);

		if (dataNames.length) {
			for (let index = 0; index < dataNames.length; index++) {

				// Check if Name matches existing Name in Database
				const nameCheck = await dataModel.find({ name: dataNames[index].name }).exec();

				if (!nameCheck.length) {
					// If Name doesn't exist, create new Database Document and push new ID to linkedDataArray
					const name = await dataModel.create(dataNames[index]);
					linkedDataArray.push({ _id: name._id });
				} else {
					// If Name does exist, push the exisiting ID to linkedDataArray
					nameCheck.forEach(name => {
						linkedDataArray.push({_id: name._id});
					})
				}
			}
		}

		// Filter ID properties from dataObjectArray, push any IDs present to linkedDataArray
		const dataIds = dataObjectArray.filter(dataObj => dataObj._id);

		if (dataIds.length) {
			dataIds.forEach(dataId => {
				linkedDataArray.push({ _id: dataId._id });
			})
		}
	}
	return linkedDataArray;
}

//===============================================================================================================//

module.exports = DocumentUtilities;
