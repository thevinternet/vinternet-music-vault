const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//===============================================================================================================//

const ArtistSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide the name of the artist"]
		},
		real_name: {
			type: String
		},
		alias_name: [
			{
				type: Schema.Types.ObjectId,
				ref: "Artist"
			}
		],
		profile: {
			type: String,
			default: "No profile summary added"
		},
		picture: {
			type : [
				{
					filename: String,
					location: String,
					format: String
				}
			],
			default : [
				{
					filename : "avatar.jpg",
					location : "avatar.jpg",
					format: "image/jpeg"
				}
			]
		},
		website: {
			type: [
				{ name: String, url: String }
			],
			default: [
				{ name: "Personal Website", url: ""},
				{ name: "Discogs", url: ""},
				{ name: "Bandcamp", url: ""},
				{ name: "Soundcloud", url: ""},
				{ name: "Twitter", url: ""}
			]
		},
		discogs_id: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

const ArtistModel = mongoose.model("Artist", ArtistSchema, "artist");

//===============================================================================================================//

module.exports = ArtistModel;
