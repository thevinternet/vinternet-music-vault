var LabelModel = require("../models/label.model");
const LabelController = {};

//===============================================================================================================//

// Helper Function - Create Label Document (Managing Linked Parent & Subsidiary Labels)

createLabelDocument = async (label) => {

  const props = {
    labelName: label.labelName,
    parentLabel: [],
    subsidiaryLabel: [],
    profile: label.profile,
    website: label.website,
    discogs_id: label.discogsId,
  }

  if (label.parentLabel.length) {

    const parentLabelNames = label.parentLabel.filter(parent => parent.name);

    if (parentLabelNames.length) {
      const parentNames = await LabelModel.create(parentLabelNames);
      parentNames.forEach(name => {
        props.parentLabel.push({ _id: name._id })
      })
    }

    const parentLabelIds = label.parentLabel.filter(parent => parent._id);

    if (parentLabelIds.length){
      parentLabelIds.forEach(parentLabelId => {
        props.parentLabel.push({ _id: parentLabelId._id })
      })
    }  
  }
  
  if (label.subsidiaryLabel.length) {

    const subsidiaryLabelNames = label.subsidiaryLabel.filter(subsidiary => subsidiary.name);

    if (subsidiaryLabelNames.length) {
      const subsidiaryNames = await LabelModel.create(subsidiaryLabelNames);
      subsidiaryNames.forEach(name => {
        props.subsidiaryLabel.push({ _id: name._id })
      })
    }

    const subsidiaryLabelIds = label.subsidiaryLabel.filter(subsidiary => subsidiary._id);

    if (subsidiaryLabelIds.length){
      subsidiaryLabelIds.forEach(subsidiaryLabelId => {
        props.subsidiaryLabel.push({ _id: subsidiaryLabelId._id })
      })
    }
  }
  return props;
}

//===============================================================================================================//

// Controller - Retrieve All Labels

LabelController.getAllLabels = (req, res, next) => {
  return LabelModel.getAllLabels()
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

// Controller - Retrieve Single Label By Id

LabelController.getLabelById = (req, res, next) => {
  const id = req.params.id;

  return LabelModel.getLabelById(id)
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

// Controller - Create New Label With Text Properties & Image File

LabelController.createNewLabelFile = async (req, res, next) => {
  
  const props = await createLabelDocument(JSON.parse(req.body.label));
  
  const file = {
    location: req.file.filename,
    filename: req.file.originalname,
    format: req.file.mimetype
  };

  return LabelModel.createNewLabel(props, file)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.labelName} successfully added`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Create New Label With Text Properties File

LabelController.createNewLabelText = async (req, res, next) => {
  
  const props = await createLabelDocument(req.body.label);
  
  const file = {
    location: "avatar.jpg",
    filename: "avatar.jpg",
    format: "image/jpeg"
  };

  return LabelModel.createNewLabel(props, file)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.labelName} successfully added`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Update Label Text Properties & Image File By Id

LabelController.updateLabelPropertiesFile = async (req, res, next) => {
  
  const id = req.body.id;

  const props = await createLabelDocument(JSON.parse(req.body.label));
  
  const file = {
    location: req.file.filename,
    filename: req.file.originalname,
    format: req.file.mimetype
  };

  return LabelModel.updateLabelPropertiesFile(id, props, file)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.labelName} successfully updated`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Update Label Text Properties Only By Id

LabelController.updateLabelPropertiesText = async (req, res, next) => {
  
  const id = req.body.id;
  
  const props = await createLabelDocument(req.body.label);

  return LabelModel.updateLabelPropertiesText(id, props)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `${props.labelName} successfully updated`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

// Controller - Remove Single Label By Id

LabelController.removeLabelById = (req, res, next) => {
  
  const id = req.params.id;

  return LabelModel.removeLabelById(id)
    .then(result => {
      if (result.status === "error") {
        return res.json({
          failure: `${result.type}: ${result.msg}`
        });
      } else {
        return res.json({
          success: `Label removed from database`,
          reference: result
        });
      }
    })
    .catch(error => {
      return res.json(error);
    });
};

//===============================================================================================================//

module.exports = LabelController;
