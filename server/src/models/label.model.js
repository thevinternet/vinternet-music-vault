const LabelModel = require("../schemas/label.schema");

//===============================================================================================================//

// Return ALL documents in Labels collection

LabelModel.getAllLabels = () => {
  return LabelModel.find({})
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

// Return Label By Id

LabelModel.getLabelById = id => {
  return LabelModel.findById(id)
    .lean()
    .populate("parent_label", "name")
    .populate("subsidiary_label", "name")
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

// Create New Label

LabelModel.createNewLabel = (props, file) => {
  const newLabel = new LabelModel({
    name: props.labelName,
    parent_label: props.parentLabel,
    subsidiary_label: props.subsidiaryLabel,
    profile: props.profile,
    website: props.website,
    discogs_id: props.discogsId,
    picture: file
  });

  return newLabel
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

// Update Label Text Properties & Image File By Id

LabelModel.updateLabelPropertiesFile = (id, props, file) => {
  return LabelModel.updateOne(
    { _id: id },
    {
      $set: {
        name: props.labelName,
        parent_label: props.parentLabel,
        subsidiary_label: props.subsidiaryLabel,
        profile: props.profile,
        website: props.website,
        discogs_id: props.discogs_id,
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

// Update Label Text Properties Only By Id

LabelModel.updateLabelPropertiesText = (id, props) => {
  return LabelModel.updateOne(
    { _id: id },
    {
      $set: {
        name: props.labelName,
        parent_label: props.parentLabel,
        subsidiary_label: props.subsidiaryLabel,
        profile: props.profile,
        website: props.website,
        discogs_id: props.discogs_id
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

// Remove Label By Id

LabelModel.removeLabelById = id => {
  return LabelModel.deleteOne({ _id: id })
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

module.exports = LabelModel;
