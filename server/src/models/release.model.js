const ReleaseModel = require("../schemas/release.schema");

//===============================================================================================================//
// Return ALL documents in Releases collection
//===============================================================================================================//

ReleaseModel.getAllReleases = async () => {
	try {
		const releases = await ReleaseModel.find({});

		if (!releases.length) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							msg: "No release results found"
						}
					]
				}
			}
		} else {
			//.populate("artist_name", "name")
			return ReleaseModel.find({}).populate("label_name", "name").lean().sort("catalogue").exec();
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
// Return Release Document by ID
//===============================================================================================================//

ReleaseModel.getReleaseById = async (id) => {
	try {
		const release = await ReleaseModel.findById(id);

		if (release === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The release Id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			//.populate("artist_name", "name")
			return ReleaseModel.findById(id).populate("tracks.artist_name", "name").populate("label_name", "name").lean().sort("catalogue").exec();
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
// Return Release Documents by Label ID
//===============================================================================================================//

ReleaseModel.getReleasesByLabel = async (id) => {
	try {
		const release = await ReleaseModel.findById({ label_name: id });

		if (release === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "No releases for the Label Id provided were found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			//.populate("artist_name", "name")
			return ReleaseModel.findById(id).populate("tracks.artist_name", "name").populate("label_name", "name").lean().sort("catalogue").exec();
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
// Return Release Documents by Artist ID
//===============================================================================================================//

ReleaseModel.getReleasesByArtist = async (id) => {
	try {
		const release = await ReleaseModel.findById({ tracks: artist_name._id });

		if (release === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "No releases for the Artist Id provided were found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			//.populate("artist_name", "name")
			return ReleaseModel.findById({ tracks: artist_name._id }).populate("tracks", "artist_name").populate("label_name", "name").lean().sort("catalogue").exec();
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
// Create New Release Document
//===============================================================================================================//

ReleaseModel.createNewRelease = async (props, file) => {
	try {
		const release = await ReleaseModel.create({
			title: props.releaseTitle,
			label_name: props.labelName,
			catalogue: props.catalogue,
			year: props.year,
			format: props.format,
			tracks: props.tracks,
			discogs_url: props.discogsUrl,
			discogs_id: props.discogsId,
			picture: file
		});

		return release;

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
// Update Existing Release Document
//===============================================================================================================//

ReleaseModel.updateExistingReleaseById = async (id, props) => {
	
	// Create 'Set' Object with updated Release Props and optional Image File
	const releaseUpdateProps = {
		$set: {
			title: props.releaseTitle,
			label_name: props.labelName,
			catalogue: props.catalogue,
			year: props.year,
			format: props.format,
			tracks: props.tracks,
			discogs_url: props.discogsUrl,
			discogs_id: props.discogsId
		}
	}
	if (props.picture) {
		releaseUpdateProps.$set.picture = props.picture;
	}

	// Submit release update object to model and handle response
	try {
		const release = await ReleaseModel.updateOne(
			{ _id: id },
			releaseUpdateProps,
			{ new: true }
		);

		return release;

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
// // Remove Release By ID
//===============================================================================================================//

// TODO: Handle Removal of Tracks associated with Release!

ReleaseModel.removeReleaseById = async (id) => {
	try {
		const release = await ReleaseModel.findById(id);

		if (release === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The release id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return ReleaseModel.deleteOne({ _id: id }).exec();
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

module.exports = ReleaseModel;
