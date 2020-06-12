const ReleaseModel = require("../models/release.model");
const ReleaseController = {};

//===============================================================================================================//

// Helper Function - Manage & Create Linked Data For Artists & Labels

manageLinkedData = async (dataArray, dataModel) => {

  let linkedData = [];

  const arrayNames = dataArray.filter(item => item.name);

  if (arrayNames.length) {
    try {
    const linkedArrayNames = await dataModel.create(arrayNames);
    linkedArrayNames.forEach(name => {
      linkedData.push({ _id: name._id })
    })
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  //==================================================//

  const arrayIds = dataArray.filter(item => item._id);

  if (arrayIds.length){
    arrayIds.forEach(identifier => {
      linkedData.push({ _id: identifier._id })
    })
  }

  return linkedData;
}

//===============================================================================================================//

// Helper Function - Create Release Document (Managing Linked Artists & Labels)

createReleaseDocument = async (release) => {

  const props = {
    artistName: [],
    title: release.releaseTitle,
    labelName: [],
    catalogue: release.catalogue,
    year: release.releaseYear,
    format: release.releaseFormat,
    discogs_url: release.discogsLink,
    discogs_id: release.discogsId,
    track: []
  }

  //==================================================//

  if (release.artistName.length) {
    let updatedArtist;
    try {
      updatedArtist = await manageLinkedData(release.artistName, "ArtistModel");
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    props.artistName = updatedArtist;
  }

  //==================================================//

  if (release.labelName.length) {
    let updatedLabel;
    try {
      updatedLabel = await manageLinkedData(release.labelName, "LabelModel");
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    props.labelName = updatedLabel;
  }

  //==================================================//

  if (release.tracks.length) {
    const updatedTracks = await Promise.all(release.tracks.map(async (item) => {
      try {
        let track = {
          track_number: item.trackNumber,
          artist_name: await manageLinkedData(item.artistName, "ArtistModel"),
          title: item.trackTitle,
          catalogue: item.catalogueReference,
          genre: item.genre,
          mixkey: item.mixKey,
          file_location: item.fileLocation
        }
        return track;
      }
      catch(error) {
        throw new Error(`Error: ${error}`);
      }
    }))
    props.track = updatedTracks;
  }

  return props;
}

//===============================================================================================================//

// Controller - Retrieve All Releases

ReleaseController.getAllReleases = (req, res, next) => {
  return ReleaseModel.getAllReleases()
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

// Controller - Retrieve Single Release By Id

ReleaseController.getReleaseById = (req, res, next) => {
  const id = req.params.id;

  return ReleaseModel.getReleaseById(id)
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

// Controller - Retrieve All Releases By Label Id

ReleaseController.getReleasesByLabel = (req, res, next) => {
  const id = req.params.id;

  return ReleaseModel.getReleasesByLabel(id)
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

// Controller - Retrieve All Releases By Artist Id

ReleaseController.getReleasesByArtist = (req, res, next) => {
  const id = req.params.id;

  return ReleaseModel.getReleasesByArtist(id)
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

// Controller - Update Release Text Properties & Image File By Id

ReleaseController.updateReleasePropertiesFile = async (req, res, next) => {
  
  const id = req.body.id;
  const props = await createReleaseDocument(JSON.parse(req.body.release));
  const file = {
    location: req.file.filename,
    filename: req.file.originalname,
    format: req.file.mimetype
  };

  return ReleaseModel.updateReleasePropertiesFile(id, props, file)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.title} successfully updated`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Update Release Text Properties Only By Id

ReleaseController.updateReleasePropertiesText = async (req, res, next) => {
  
  const id = req.body.id;
  const props = await createReleaseDocument(req.body.release);

  return ReleaseModel.updateReleasePropertiesText(id, props)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.title} successfully updated`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Remove Single Release By Id

ReleaseController.removeReleaseById = (req, res, next) => {
  
  const id = req.params.id;

  return ReleaseModel.removeReleaseById(id)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `Release removed from database`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

module.exports = ReleaseController;
