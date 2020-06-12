const ReleaseModel = require("../schemas/release.schema");

//===============================================================================================================//

// Return ALL documents in Releases collection

ReleaseModel.getAllReleases = () => {
  return ReleaseModel.find({})
    .populate("artist_name", "name")
    .populate("label_name", "name")
    .sort("catalogue")
    .lean()
    .exec()
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

//===============================================================================================================//

// Return Release By Id

ReleaseModel.getReleaseById = id => {
  return ReleaseModel.findById(id)
  .populate("artist_name", "name")
  .populate("track.artist_name", "name")
  .populate("label_name", "name")
  .lean()
  .exec()
    .then(result => {
      return result;
    })
    .catch(error => {
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

// Return Release By Label Id

ReleaseModel.getReleasesByLabel = id => {
  return ReleaseModel.find({ label_name: id })
  .populate("artist_name", "name")
  .populate("track.artist_name", "name")
  .populate("label_name", "name")
  .sort("catalogue")
  .lean()
  .exec()
    .then(result => {
      return result;
    })
    .catch(error => {
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

// Return Release By Artist Id

ReleaseModel.getReleasesByArtist = id => {
  return ReleaseModel.find({ artist_name: id })
  .populate("artist_name", "name")
  .populate("track.artist_name", "name")
  .populate("label_name", "name")
  .sort("catalogue")
  .lean()
  .exec()
    .then(result => {
      return result;
    })
    .catch(error => {
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

// Update Release Text Properties & Image File By Id

ReleaseModel.updateReleasePropertiesFile = (id, props, file) => {
  return ReleaseModel.updateOne(
    { _id: id },
    {
      $set: {
        artist_name: props.artistName,
        title: props.title,
        label_name: props.labelName,
        catalogue: props.catalogue,
        year: props.year,
        format: props.format,
        discogs_url: props.discogs_url,
        discogs_id: props.discogs_id,
        track: props.track,
        picture: file
      }
    },
    { new: true }
  )
    .exec()
    .then(result => {
      return result;
    })
    .catch(error => {
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

// Update Release Text Properties Only By Id

ReleaseModel.updateReleasePropertiesText = (id, props) => {
  console.log(props);
  return ReleaseModel.updateOne(
    { _id: id },
    {
      $set: {
        artist_name: props.artistName,
        title: props.title,
        label_name: props.labelName,
        catalogue: props.catalogue,
        year: props.year,
        format: props.format,
        discogs_url: props.discogs_url,
        discogs_id: props.discogs_id,
        track: props.track
      }
    },
    { new: true }
  )
    .exec()
    .then(result => {
      return result;
    })
    .catch(error => {
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

// Remove Release By Id

ReleaseModel.removeReleaseById = id => {
  return ReleaseModel.deleteOne({ _id: id })
    .exec()
    .then(result => {
      return result;
    })
    .catch(error => {
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

module.exports = ReleaseModel;
