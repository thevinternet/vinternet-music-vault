const ArtistModel = require("../models/artist.model");
const ArtistUtilties = {}

//===============================================================================================================//
// Utility - Create Artist Document (Managing Linked Alias Names)
//===============================================================================================================//

ArtistUtilties.createArtistDocument = async (artist) => {

	const props = {
		artistName: artist.artistName,
		realName: artist.realName,
		aliasName: [],
		profile: artist.profile,
		website: artist.website,
		discogsId: artist.discogsId,
	}

	if (artist.aliasName.length) {

		// Filter alias name properties from artist obj, create new artist docs where required and push to props obj
		const aliasArtistNames = artist.aliasName.filter(alias => alias.name);

		if (aliasArtistNames.length) {
			for (let index = 0; index < aliasArtistNames.length; index++) {

				// If artist name doesn't create new artist and push to aliasName array
				const artistCheck = await ArtistModel.find({ name: aliasArtistNames[index].name }).exec();

				if (!artistCheck.length) {
					const name = await ArtistModel.create(aliasArtistNames[index]);
					props.aliasName.push({ _id: name._id })
				}
			}
		}

		// Filter alias id properties from artist obj and push to props obj
		const aliasArtistIds = artist.aliasName.filter(alias => alias._id);

		if (aliasArtistIds.length) {
			aliasArtistIds.forEach(aliasArtistId => {
				props.aliasName.push({ _id: aliasArtistId._id })
			})
		}
	}

	return props;
}

//===============================================================================================================//

module.exports = ArtistUtilties;
