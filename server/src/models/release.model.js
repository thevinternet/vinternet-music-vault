const ReleaseModel = require("../schemas/release.schema");
const TrackModel = require("../schemas/track.schema");

//===============================================================================================================//
// Return ALL documents in Releases collection
//===============================================================================================================//

ReleaseModel.getAllReleases = async () => {
	try {
		const releases = await ReleaseModel.find({});

		if (!releases.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							msg: "No release results found"
						}
					]
				}
			}
		} else {
			return ReleaseModel.find({})
				.populate("artist_name", "name")
				.populate("label_name", "name")
				.lean()
				.sort("catalogue")
				.exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			return ReleaseModel.findById(id)
				.populate("artist_name", "name")
				.populate("label_name", "name")
				.lean()
				.sort("catalogue")
				.exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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
		const release = await ReleaseModel.find({ label_name: id });

		if (!release.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			return ReleaseModel.find({ label_name: id })
				.populate("artist_name", "name")
				.populate("label_name", "name")
				.lean()
				.sort("catalogue")
				.exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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
		const release = await ReleaseModel.find({ artist_name : id })

		if (!release.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			return ReleaseModel.find({ artist_name : id })
				.populate("artist_name", "name")
				.populate("label_name", "name")
				.lean()
				.sort("catalogue")
				.exec();
		}
	} catch (err) {
		return {
			error : {
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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

ReleaseModel.createNewRelease = async (id, props) => {

	// Create 'Set' Object with Release Props
	const releaseCreateProps = {
		$set: {
			title: props.title,
			artist_name: props.artist_name,
			label_name: props.label_name,
			catalogue: props.catalogue,
			year: props.year,
			format: props.format,
			tracks: props.tracks,
			discogs_url: props.discogs_url,
			discogs_id: props.discogs_id,
			picture: props.picture
		}
	}
	// Submit release object to model and handle response
	try {
		const release = await ReleaseModel.updateOne(
			{ _id: id },
			releaseCreateProps,
			{ new: true }
		);

		return release;

	} catch (err) {
		return {
			error : {
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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
			title: props.title,
			artist_name: props.artist_name,
			label_name: props.label_name,
			catalogue: props.catalogue,
			year: props.year,
			format: props.format,
			tracks: props.tracks,
			discogs_url: props.discogs_url,
			discogs_id: props.discogs_id
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
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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

ReleaseModel.removeReleaseById = async (id) => {
	try {
		const release = await ReleaseModel.findById(id);

		if (release === null) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			ReleaseModel.deleteOne({ _id: id }).exec();
			TrackModel.deleteMany({ release_ref: id }).exec();
		}

	} catch (err) {
		return {
			error : {
				status: `Database Error (Mongoose): ${err.name}`,
				response: "HTTP Status Code 200 (OK)",
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
