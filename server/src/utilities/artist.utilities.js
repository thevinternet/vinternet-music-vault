const ArtistModel = require("../models/artist.model");
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

	if (artist.aliasName.length) {

		// Filter alias name properties from Artist obj, create new Artist docs where required and push to props obj
		const aliasArtistNames = artist.aliasName.filter(alias => alias.name);

		if (aliasArtistNames.length) {
			for (let index = 0; index < aliasArtistNames.length; index++) {

				// Check if Alias Name matches existing Artist in database
				const artistCheck = await ArtistModel.find({ name: aliasArtistNames[index].name }).exec();

				if (!artistCheck.length) {
					// If Artist name doesn't exist, create new Artist Document and push new Id to aliasName array
					const name = await ArtistModel.create(aliasArtistNames[index]);
					props.aliasName.push({ _id: name._id })
				} else {
					// If Artist name does exist, push the Artist Id to aliasName array
					artistCheck.forEach(artist => {
						props.aliasName.push({_id: artist._id});
					})
				}
			}
		}

		// Filter Alias Id properties from Artist obj and push to props obj
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

module.exports = ArtistUtilities;
