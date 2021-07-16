const ArtistModel = require("../models/artist.model");
const DocumentUtilities = require("../utilities/document.utilities");
const ArtistUtilities = {}

//===============================================================================================================//
// Utility - Create Artist Document (Managing Linked Alias Names)
//===============================================================================================================//

ArtistUtilities.createArtistDocument = async (artist) => {

	const props = {
		name: artist.name,
		real_name: artist.real_name,
		profile: artist.profile,
		website: artist.website,
		discogs_id: artist.discogs_id,
	}

	// Create linked Alias Name data properties
	props.alias_name = await DocumentUtilities.manageLinkedData(artist.alias_name, ArtistModel);

	return props;
}

//===============================================================================================================//

module.exports = ArtistUtilities;
