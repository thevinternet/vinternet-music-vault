const ArtistModel = require("../models/artist.model");
const LabelModel = require("../models/label.model");
const TrackModel = require("../models/track.model");
const DocumentUtilities = require("../utilities/document.utilities");
const TrackUtilities = {}

//===============================================================================================================//
// Utility - Create/Update Track Documents (Managing Linked Data & Release Links)
//===============================================================================================================//

TrackUtilities.createTrackDocuments = async (tracks, releaseId) => {

	const tracksArray = [...tracks];
	let releaseTrackProps = {
		trackId: [],
		artistId: [],
	};

	if (tracksArray.length) {
		for (let index = 0; index < tracksArray.length; index++) {

			// Loop through tracksArray, updating track object props with linked data
			tracksArray[index].artist_name = await DocumentUtilities.manageLinkedData(tracksArray[index].artist_name, ArtistModel);
			tracksArray[index].release_title = [{ _id: releaseId }];
			tracksArray[index].release_label = await DocumentUtilities.manageLinkedData(tracksArray[index].release_label, LabelModel);
			tracksArray[index].release_catalogue = [{ _id: releaseId }];
			tracksArray[index].release_picture = [{ _id: releaseId }];
			tracksArray[index].release_ref = releaseId;

			// Loop through updated tracksArray handling Track document creation & updating respectively
			if (!tracksArray[index]._id) {

				// If Track has no existing ID, create new Track Document & push new ID to trackIds array
				let newTrack = await TrackModel.createNewTrack(tracksArray[index]);
				releaseTrackProps.trackId.push({ _id: newTrack._id });

			} else {
				// If Track has existing ID, update existing Track Document & push existing ID to trackIds array
				let updatedTrack = await TrackModel.updateExistingTrackById(tracksArray[index]._id, tracksArray[index]);
				releaseTrackProps.trackId.push({ _id: tracksArray[index]._id });
			}

			// Loop through updated artist_name Ids & push to artistId array
			if (tracksArray[index].artist_name.length) {
				for (let artistIndex = 0; artistIndex < tracksArray[index].artist_name.length; artistIndex++) {
					releaseTrackProps.artistId.push(tracksArray[index].artist_name[artistIndex]);
				}
			}
		}
	}

	return releaseTrackProps;
}

//===============================================================================================================//
// Utility - Remove Track Documents (During Update Release Process)
//===============================================================================================================//

TrackUtilities.removeExistingTrackDocuments = async (updatedTracks, releaseId) => {

	let updatedTrackIds = [];
	let existingTrackIds = [];

	// If updatedTracks array has values, push Ids to new updatedTrackIds array
	if (updatedTracks.length) {
		updatedTracks.forEach(track => {
			updatedTrackIds.push(track._id.toString())
		})
	}

	// Check DB for existing Tracks associated with Release
	const existingTracks = await TrackModel.find({ release_title: releaseId });

	// If existingTracks array has values, push Ids to new existingTracksIds array
	if (existingTracks.length) {
		existingTracks.forEach(track => {
			existingTrackIds.push(track._id.toString())
		})
	}
	
	// Filter out existingTracks & updatedTracks to leave remaining Tracks for deletion
	const tracksToRemove = existingTrackIds.filter(item => !updatedTrackIds.includes(item));

	// Delete remaining Tracks from database
	if (tracksToRemove.length) {
		for (let index = 0; index < tracksToRemove.length; index++) {
			await TrackModel.deleteOne({ _id: tracksToRemove[index] }).exec();
		}
	}

	next();
}

//===============================================================================================================//

module.exports = TrackUtilities;
