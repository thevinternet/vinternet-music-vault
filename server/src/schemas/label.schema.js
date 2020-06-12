const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//===============================================================================================================//

const LabelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the label name"]
    },
    parent_label: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label"
      }
    ],
    subsidiary_label: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label"
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
        { name: String, url: String },
        { name: String, url: String },
        { name: String, url: String },
        { name: String, url: String },
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
      type: String,
      default: "0"
    }
  },
  {
    timestamps: true
  }
);

const LabelModel = mongoose.model("Label", LabelSchema, "label");

//===============================================================================================================//

module.exports = LabelModel;
