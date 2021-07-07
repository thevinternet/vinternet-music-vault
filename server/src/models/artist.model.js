const ArtistModel = require("../schemas/artist.schema");

//===============================================================================================================//
// Return ALL documents in Artists collection
//===============================================================================================================//

ArtistModel.getAllArtists = async () => {
	try {
		const artists = await ArtistModel.find({});

		if (!artists.length) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							msg: "No artist results found"
						}
					]
				}
			}
		} else {
			return ArtistModel.find({}).lean().sort("name").exec();
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
// Return Artist Document by ID
//===============================================================================================================//

ArtistModel.getArtistById = async (id) => {
	try {
		const artist = await ArtistModel.findById(id);

		if (artist === null) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The artist Id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return ArtistModel.findById(id).populate("alias_name", "name").lean().exec();
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
// Create New Artist Document
//===============================================================================================================//

ArtistModel.createNewArtist = async (props, file) => {
	try {
		const artist = await ArtistModel.create({
			name: props.artistName,
			real_name: props.realName,
			alias_name: props.aliasName,
			profile: props.profile,
			website: props.website,
			discogs_id: props.discogsId,
			picture: file
		});

		return artist;

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
// Update Existing Artist Document
//===============================================================================================================//

ArtistModel.updateExistingArtistById = async (id, props) => {
	
	// Create 'Set' Object with updated Artist Props and optional Image File
	const artistUpdateProps = {
		$set: {
			name: props.artistName,
			real_name: props.realName,
			alias_name: props.aliasName,
			profile: props.profile,
			website: props.website,
			discogs_id: props.discogsId,
		}
	}
	if (props.picture) {
		artistUpdateProps.$set.picture = props.picture;
	}

	// Submit artist update object to model and handle response
	try {
		const artist = await ArtistModel.updateOne(
			{ _id: id },
			artistUpdateProps,
			{ new: true }
		);

		return artist;

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
// // Remove Artist By Id
//===============================================================================================================//

ArtistModel.removeArtistById = async (id) => {
	try {
		const artist = await ArtistModel.findById(id);

		if (artist === null) {
			return {
				error : {
					status: "Request Successful",
					response: "HTTP Status Code 200 (OK)",
					errors: [
						{
							value: id,
							msg: "The artist id provided was not found",
							param: "id",
							location: "params"
						}
					]
				}
			}
		} else {
			return ArtistModel.deleteOne({ _id: id }).exec();
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

module.exports = ArtistModel;
