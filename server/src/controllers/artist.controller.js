const ArtistModel = require("../models/artist.model");
const ArtistController = {};

//===============================================================================================================//

// Helper Function - Create Artist Document (Managing Linked Alias Names)

createArtistDocument = async (artist) => {

  const props = {
    artistName: artist.artistName,
    realName: artist.realName,
    aliasName: [],
    profile: artist.profile,
    website: artist.website,
    discogs_id: artist.discogsId,
  }

  if (artist.aliasName.length) {

    const aliasArtistNames = artist.aliasName.filter(alias => alias.name);

    if (aliasArtistNames.length) {
      const names = await ArtistModel.create(aliasArtistNames);
      names.forEach(name => {
        props.aliasName.push({ _id: name._id })
      })
    }

    const aliasArtistIds = artist.aliasName.filter(alias => alias._id);

    if (aliasArtistIds.length){
      aliasArtistIds.forEach(aliasNameId => {
        props.aliasName.push({ _id: aliasNameId._id })
      })
    }
  }
  return props;
}

//===============================================================================================================//

// Controller - Retrieve All Artists

ArtistController.getAllArtists = (req, res, next) => {
  return ArtistModel.getAllArtists()
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json(result);
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Retrieve Single Artist By Id

ArtistController.getArtistById = (req, res, next) => {
  
  const id = req.params.id;

  return ArtistModel.getArtistById(id)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json(result);
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Create New Artist With Text Properties & Image File

ArtistController.createNewArtistFile = async (req, res, next) => {

  const props = await createArtistDocument(JSON.parse(req.body.artist));

  const file = {
    location: req.file.filename,
    filename: req.file.originalname,
    format: req.file.mimetype
  };

  return ArtistModel.createNewArtist(props, file)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.artistName} successfully added`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Create New Artist With Text Properties Only

ArtistController.createNewArtistText = async (req, res, next) => {

  const props = await createArtistDocument(req.body.artist);

  const file = {
    location: "avatar.jpg",
    filename: "avatar.jpg",
    format: "image/jpeg"
  };

  return ArtistModel.createNewArtist(props, file)
  .then(result => {
    if (result.status === "error") {
      return res.json({
        failure: `${result.type}: ${result.msg}`
      });
    } else {
      return res.json({
        success: `${props.artistName} successfully added`,
        reference: result
      });
    }
  })
  .catch(error => {
    return res.json(error);
  });

};

//===============================================================================================================//

// Controller - Update Artist Text Properties & Image File By Id

ArtistController.updateArtistPropertiesFile = async (req, res, next) => {
  
  const id = req.body.id;

  const props = await createArtistDocument(JSON.parse(req.body.artist));
  
  const file = {
    location: req.file.filename,
    filename: req.file.originalname,
    format: req.file.mimetype
  };

  return ArtistModel.updateArtistPropertiesFile(id, props, file)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.artistName} successfully updated`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Update Artist Text Properties Only By Id

ArtistController.updateArtistPropertiesText = async (req, res, next) => {
  
  const id = req.body.id;

  const props = await createArtistDocument(req.body.artist);

  return ArtistModel.updateArtistPropertiesText(id, props)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.artistName} successfully updated`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Remove Single Artist By Id

ArtistController.removeArtistById = (req, res, next) => {
  const id = req.params.id;

  return ArtistModel.removeArtistById(id)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `Artist removed from database`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

module.exports = ArtistController;
