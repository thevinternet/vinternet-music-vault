const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//===============================================================================================================//

const TrackSchema = new Schema(
	{
		name: { 
			type: String,
			required: [true, "Please provide the name for the track"]
		},
		artist_name: [
			{ 
				type: Schema.Types.ObjectId,
				ref: "Artist"
			}
		],
		release_title: [
			{ 
				type: Schema.Types.ObjectId,
				ref: "Release"
			}
		],
		release_label: [
			{
				type: Schema.Types.ObjectId,
				ref: "Label"
			}
		],
		release_catalogue: [
			{ 
				type: Schema.Types.ObjectId,
				ref: "Release"
			}
		],
		release_picture: [
			{
				type: Schema.Types.ObjectId,
				ref: "Release"
			}
		],
		release_ref: {
			type: Schema.Types.ObjectId,
			ref: "Release"
		},
		track_number: { 
			type: Number
		},
		genre: { 
			type: String
		},
		mixkey: {
			type: String
		},
		file_location: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

const TrackModel = mongoose.model("Track", TrackSchema, "track");

//===============================================================================================================//

module.exports = TrackModel;
