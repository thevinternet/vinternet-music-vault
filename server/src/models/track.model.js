const TrackModel = require("../schemas/track.schema");

//===============================================================================================================//
// Return ALL documents in Tracks collection
//===============================================================================================================//

TrackModel.getAllTracks = async () => {
	try {
		const tracks = await TrackModel.find({});

		if (!tracks.length) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							msg: "No track results found"
						}
					]
				}
			}
		} else {
			return TrackModel.find({})
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.lean().sort("release_catalogue").exec();
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
// Return Track Document by ID
//===============================================================================================================//

TrackModel.getTrackById = async (id) => {
	try {
		const track = await TrackModel.findById(id);

		if (track === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The track Id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return TrackModel.findById(id)
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.lean().exec();
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
// Return Track Documents By Artist ID
//===============================================================================================================//

TrackModel.getTracksByArtist = async (id) => {
	try {
		const tracks = await TrackModel.findById({ artist_name: id });

		if (tracks === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "No tracks for the artist Id provided were found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return TrackModel.findById({ artist_name: id })
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.sort("release_catalogue").lean().exec();
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
// Return Track Documents By Label ID
//===============================================================================================================//

TrackModel.getTracksByLabel = async (id) => {
	try {
		const tracks = await TrackModel.findById({ release_label: id });

		if (tracks === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "No tracks for the label Id provided were found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return TrackModel.findById({ release_label: id })
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.sort("release_catalogue").lean().exec();
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
// Return Track Documents By Release ID
//===============================================================================================================//

TrackModel.getTracksByRelease = async (id) => {
	try {
		const tracks = await TrackModel.findById({ release_title: id });

		if (tracks === null) {
			return {
				error : {
					status: "Request Successful: HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "No tracks for the release Id provided were found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return TrackModel.findById({ release_title: id })
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.sort("release_catalogue").lean().exec();
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

module.exports = TrackModel;
