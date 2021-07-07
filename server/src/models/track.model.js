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
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
				.lean()
				.sort("release_catalogue")
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
// Return Track Document by ID
//===============================================================================================================//

TrackModel.getTrackById = async (id) => {
	try {
		const track = await TrackModel.findById(id);

		if (track === null) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
				.lean()
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
// Return Track Documents By Artist ID
//===============================================================================================================//

TrackModel.getTracksByArtist = async (id) => {
	try {
		const tracks = await TrackModel.find({ artist_name : id });

		if (!tracks.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			return TrackModel.find({ artist_name : id })
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.lean()
				.sort("release_catalogue")
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
// Return Track Documents By Label ID
//===============================================================================================================//

TrackModel.getTracksByLabel = async (id) => {
	try {
		const tracks = await TrackModel.find({ release_label : id });

		if (!tracks.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			return TrackModel.find({ release_label : id })
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.lean()
				.sort("release_catalogue")
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
// Return Track Documents By Release ID
//===============================================================================================================//

TrackModel.getTracksByRelease = async (id) => {
	try {
		const tracks = await TrackModel.find({ release_title: id });

		if (!tracks.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
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
			return TrackModel.find({ release_title: id })
				.populate("release_title", "title")
				.populate("artist_name", "name")
				.populate("release_label", "name")
				.populate("release_catalogue", "catalogue")
				.populate("release_picture", "picture")
				.lean()
				.sort("release_catalogue")
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
// Create New Track Document
//===============================================================================================================//

TrackModel.createNewTrack = async (props) => {
	try {
		const track = await TrackModel.create({
			name: props.name,
			artist_name: props.artist_name,
			release_title: props.release_title,
			release_label: props.release_label,
			release_catalogue: props.release_catalogue,
			release_picture: props.release_picture,
			release_ref: props.release_ref,
			track_number: props.track_number,
			genre: props.genre,
			mixkey: props.mixkey,
			file_location: props.file_location
		});

		return track;

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
// Update Existing Track Document
//===============================================================================================================//

TrackModel.updateExistingTrackById = async (id, props) => {
	
	// Create 'Set' Object with updated Track Props
	const trackUpdateProps = {
		$set: {
			name: props.name,
			artist_name: props.artist_name,
			release_title: props.release_title,
			release_label: props.release_label,
			release_catalogue: props.release_catalogue,
			release_picture: props.release_picture,
			release_ref: props.release_ref,
			track_number: props.track_number,
			genre: props.genre,
			mixkey: props.mixkey,
			file_location: props.file_location
		}
	}

	// Submit release update object to model and handle response
	try {
		const track = await TrackModel.updateOne(
			{ _id: id },
			trackUpdateProps,
			{ new: true }
		);

		return track;

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
// // Remove Track By ID
//===============================================================================================================//

TrackModel.removeTrackById = async (id) => {
	try {
		const track = await TrackModel.findById(id);

		if (track === null) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The track id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return TrackModel.deleteOne({ _id: id }).exec();
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

module.exports = TrackModel;
