const ReleaseModel = require("../models/release.model");
const LabelModel = require("../models/label.model");
const DocumentUtilities = require("../utilities/document.utilities");
const TrackUtilities = require("../utilities/track.utilities");
const ReleaseUtilities = {}

//===============================================================================================================//
// Utility - Create Release Document (Managing Linked Data & Linked Tracks)
//===============================================================================================================//

ReleaseUtilities.createReleaseDocument = async (release, tracks) => {

	// Manage linked Label Name data properties
	const labelNames = await DocumentUtilities.manageLinkedData(release.labelName, LabelModel);

	// Create new Release Document
	const newRelease = await ReleaseModel.create({
		title: release.releaseTitle,
		label_name: labelNames,
		catalogue: release.catalogue,
		year: release.releaseYear,
		format: release.releaseFormat,
		discogs_url: release.discogsUrl,
		discogs_id: release.discogsId,
	});

	// Grab new Release ID
	const newReleaseId = newRelease._id;

	// Create new Track documents with linked data and return new Track IDs
	const linkedTracks = await TrackUtilities.createTrackDocuments(tracks, newReleaseId);

	// Append Track IDs array to newRelease object
	newRelease.tracks = linkedTracks;

	return newRelease;
}

//===============================================================================================================//
// Utility - Update Existing Release Document (Managing Linked Data & Linked Tracks)
//===============================================================================================================//

ReleaseUtilities.updateReleaseDocument = async (id, release, tracks) => {

	// Create updated Release object
	const updatedRelease = {
		title: release.releaseTitle,
		label_name: [],
		catalogue: release.catalogue,
		year: release.releaseYear,
		format: release.releaseFormat,
		discogs_url: release.discogsUrl,
		discogs_id: release.discogsId,
		picture: release.picture,
		tracks: []
	}

	// Manage linked Label Name data properties
	updatedRelease.label_name = await DocumentUtilities.manageLinkedData(release.labelName, LabelModel);

	// Create new Track documents with linked data and return new Track IDs
	const linkedTracks = await TrackUtilities.createTrackDocuments(tracks, id);

	// Append Track IDs array to newRelease object
	updatedRelease.tracks = linkedTracks;

	return updatedRelease;
}

//===============================================================================================================//

module.exports = ReleaseUtilities;
