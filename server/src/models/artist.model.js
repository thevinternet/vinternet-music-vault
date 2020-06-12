const ArtistModel = require("../schemas/artist.schema");

//===============================================================================================================//

// Return ALL documents in Artists collection

ArtistModel.getAllArtists = () => {
  return ArtistModel.find({})
    .lean()
    .sort("name")
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

// Return Artist By Id

ArtistModel.getArtistById = id => {
  return ArtistModel.findById(id)
    .lean()
    .populate("alias_name", "name")
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

// Create New Artist

ArtistModel.createNewArtist = (props, file) => {
  const newArtist = new ArtistModel({
    name: props.artistName,
    real_name: props.realName,
    alias_name: props.aliasName,
    profile: props.profile,
    website: props.website,
    discogs_id: props.discogsId,
    picture: file
  });

  return newArtist
    .save()
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

// Update Artist Text Properties & Image File By Id

ArtistModel.updateArtistPropertiesFile = (id, props, file) => {
  return ArtistModel.updateOne(
    { _id: id },
    {
      $set: {
        name: props.artistName,
        real_name: props.realName,
        alias_name: props.aliasName,
        profile: props.profile,
        website: props.website,
        discogs_id: props.discogsId,
        picture: file
      }
    },
    { new: true }
  )
    .exec()
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.log(error);
      return {
        status: "error",
        type: error.errors.name.name,
        msg: error.errors.name.message
      };
    });
};

//===============================================================================================================//

// Update Artist Text Properties Only By Id

ArtistModel.updateArtistPropertiesText = (id, props) => {
  return ArtistModel.updateOne(
    { _id: id },
    {
      $set: {
        name: props.artistName,
        real_name: props.realName,
        alias_name: props.aliasName,
        profile: props.profile,
        website: props.website,
        discogs_id: props.discogsId
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

// Remove Artist By Id

ArtistModel.removeArtistById = id => {
  return ArtistModel.deleteOne({ _id: id })
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

module.exports = ArtistModel;

//===============================================================================================================//
