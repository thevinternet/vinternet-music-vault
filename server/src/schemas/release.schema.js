const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//===============================================================================================================//

const ReleaseSchema = new Schema(
  {
    artist_name: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist"
      }
    ],
    title: {
      type: String,
      required: [true, "Please provide the title for this release"]
    },
    label_name: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label"
      }
    ],
    catalogue: {
      type: String
    },
    track: [
      {
        track_number: { type: Number },
        artist_name: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
        title: { type: String },
        catalogue: { type: String },
        genre: [{ type: String }],
        mixkey: { type: String },
        file_location: { type: String }
      }
    ],
    year: {
      type: Number,
      min: 4,
      max: 4
    },
    format: [
      {
        name: String,
        release: String
      }
    ],
    picture: [
      {
        filename: String,
        location: String,
        format: String
      }
    ],
    discogs_url: {
      type: String
    },
    discogs_id: {
      type: String,
      default: "0"
    }
  },
  {
    timestamps: true
  }
);

const ReleaseModel = mongoose.model("Release", ReleaseSchema, "release");

//===============================================================================================================//

module.exports = ReleaseModel;
