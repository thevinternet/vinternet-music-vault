const ArtistModel = require("../models/artist.model");
const LabelModel = require("../models/label.model");
const TrackModel = require("../models/track.model");
const DocumentUtilities = require("../utilities/document.utilities");
const TrackUtilities = {}

//===============================================================================================================//
// Utility - Create Track Documents (Managing Linked Data & Release Links)
//===============================================================================================================//

TrackUtilities.createTrackDocuments = async (tracks, releaseId) => {

	let tracksArray = [];
	let releaseTracksArray = [];

	// Loop through Tracks array, creating updated track objects with linked properties
	if(tracks.length) {
		const updatedTracks = await Promise.all(tracks.map(async (item) => {
			try {
				let track = {
					name: item.name,
					artist_name: await DocumentUtilities.manageLinkedData(item.artistName, ArtistModel),
					release_title: [{ _id: releaseId }],
					release_label: await DocumentUtilities.manageLinkedData(item.labelName, LabelModel),
					release_catalogue: [{ _id: releaseId }],
					release_picture: [{ _id: releaseId }],
					release_ref: releaseId,
					track_number: item.trackNumber,
					genre: item.genre,
					mixkey: item.mixKey,
					file_location: item.fileLocation
				}
				return track;
			}
			catch(error) {
				throw new Error(`Error: ${error}`);
			}
		}));
		tracksArray = updatedTracks;
	}

	// TODO: ONLY CREATE NEW TRACK DOCUMENT IF TRACK DOES NOT EXIST

	// Loop through Updated Tracks array creating new Track Documents (if applicable) & pushing each ID to seperate array for Release Document object
	if(tracksArray.length) {
		for (let index = 0; index < tracksArray.length; index++) {
			if(!tracksArray[index]._id) {
				let newTrack = await TrackModel.create(tracksArray[index]);
				releaseTracksArray.push({ _id: newTrack._id });	
			} else {
				releaseTracksArray.push({ _id: tracksArray[index]._id });
			}
		}
	}

	// Return Track ID array for Release object
	return releaseTracksArray;
}

//===============================================================================================================//

module.exports = TrackUtilities;
