const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//===============================================================================================================//

const ReleaseSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide the name of the release"]
		},
		artist_name: [
			{
				type: Schema.Types.ObjectId,
				ref: "Artist"
			}
		],
		label_name: [
			{
				type: Schema.Types.ObjectId,
				ref: "Label"
			}
		],
		catalogue: {
			type: String
		},
		year: {
			type: Number,
			min: 4
		},
		format: [
			{
				name: { type: String },
				released: { type: Boolean }
			}
		],
		picture: [
			{
				filename: { type: String },
				location: { type: String },
				format: { type: String }
			}
		],
		tracks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Track"
			}
		],
		discogs_url: {
			type: String
		},
		discogs_id: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

const ReleaseModel = mongoose.model("Release", ReleaseSchema, "release");

//===============================================================================================================//

module.exports = ReleaseModel;
