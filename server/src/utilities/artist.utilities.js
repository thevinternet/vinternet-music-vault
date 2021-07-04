const ArtistModel = require("../models/artist.model");
const DocumentUtilities = require("../utilities/document.utilities");
const ArtistUtilities = {}

//===============================================================================================================//
// Utility - Create Artist Document (Managing Linked Alias Names)
//===============================================================================================================//

ArtistUtilities.createArtistDocument = async (artist) => {

	const props = {
		artistName: artist.artistName,
		realName: artist.realName,
		aliasName: [],
		profile: artist.profile,
		website: artist.website,
		discogsId: artist.discogsId,
	}

	// Create linked Alias Name data properties
	props.aliasName = await DocumentUtilities.manageLinkedData(artist.aliasName, ArtistModel);

	return props;
}

//===============================================================================================================//

module.exports = ArtistUtilities;
