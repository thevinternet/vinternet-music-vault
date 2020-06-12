import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { formAttrInd } from "../../utilities/formHelpers/formAttributeBuilderSingle";
import { formAttrGrp } from "../../utilities/formHelpers/formAttributeBuilderGroup";
import { createLabelForm } from "../../utilities/formHelpers/formBuilderLabel";

//===============================================================================================================//

const initialState = {
  labels: [],
  label: "",
  labelForm: "",
  loading: false,
  error: null,
  success: null
};

//===============================================================================================================//

// Generic Label Reducer Functions

const labelStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const labelReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const labelResetReturnStatus = (state, action) => {
  return updateObject(state, { error: null, success: null });
};

//===============================================================================================================//

// Fetch Label Reducer Functions

const fetchLabelsSuccess = (state, action) => {
  return updateObject(state, { labels: action.labels, loading: false });
};

//===============================================================================================================//

// Fetch Label Reducer Functions

const fetchLabelSuccess = (state, action) => {
  return updateObject(state, { label: action.label, loading: false });
};

//===============================================================================================================//

// Add Label Reducer Functions

const addLabelClientPrep = (state, action) => {
  const newLabelForm = createLabelForm();
  return updateObject(state, { labelForm: newLabelForm, loading: false });
};

const addLabelSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

// Edit Label Reducer Functions

const editLabelClientPrep = (state, action) => {
  //=========================================================//

  const labelName = formAttrInd(
    action.label.name,
    "labelName",
    "input",
    true,
    false
  );
  const updatedLabelName = Object.assign(labelName);

  //=========================================================//

  let labelParent;
  let updatedParentLabel;

  if (action.label.parent_label.length) {
    labelParent = formAttrGrp(
      action.label.parent_label,
      "parentLabel",
      "input",
      false,
      true
    );
    updatedParentLabel = Object.assign(updatedLabelName, ...labelParent);
  } else {
    labelParent = formAttrInd("", "parentLabel", "input", false, true);
    updatedParentLabel = Object.assign(updatedLabelName, labelParent);
  }

  //console.log(updatedParentLabel);

  //=========================================================//

  let labelSubsidiary;
  let updatedSubsidiaryLabel;

  if (action.label.subsidiary_label.length) {
    labelSubsidiary = formAttrGrp(
      action.label.subsidiary_label,
      "subsidiaryLabel",
      "input",
      false,
      true
    );
    updatedSubsidiaryLabel = Object.assign(
      updatedParentLabel,
      ...labelSubsidiary
    );
  } else {
    labelSubsidiary = formAttrInd("", "subsidiaryLabel", "input", false, true);
    updatedSubsidiaryLabel = Object.assign(updatedParentLabel, labelSubsidiary);
  }

  //console.log(updatedSubsidiaryLabel);

  //=========================================================//

  const labelProfile = formAttrInd(
    action.label.profile,
    "profile",
    "textarea",
    true,
    false
  );
  const updatedProfile = Object.assign(updatedSubsidiaryLabel, labelProfile);

  //=========================================================//

  const labelWebsite = formAttrGrp(
    action.label.website,
    "website",
    "input",
    false,
    false
  );
  const updatedWebsite = Object.assign(updatedProfile, ...labelWebsite);

  //=========================================================//

  const labelDiscogsId = formAttrInd(
    action.label.discogs_id,
    "discogsId",
    "input",
    false,
    false
  );
  const updatedDiscogsId = Object.assign(updatedWebsite, labelDiscogsId);

  //=========================================================//

  const labelPicture = formAttrGrp(
    action.label.picture,
    "picture",
    "file",
    false,
    false
  );
  const updatedPicture = Object.assign(updatedDiscogsId, ...labelPicture);

  //=========================================================//

  const updatedLabelForm = Object.assign(updatedPicture);

  return updateObject(state, {
    label: action.label,
    labelForm: updatedLabelForm,
    loading: false
  });
};

const editLabelClientInput = (state, action) => {
  return updateObject(state, { labelForm: action.updatedObject });
};

//===============================================================================================================//

// Update Label Reducer Functions

const updateLabelSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

// Delete Label Reducer Functions

const deleteLabelSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LABEL_START_LOADING:
      return labelStartLoading(state, action);
    case actionTypes.LABEL_RETURN_FAILURE:
      return labelReturnFailure(state, action);
    case actionTypes.LABEL_RESET_RETURN_STATUS:
      return labelResetReturnStatus(state, action);
    case actionTypes.FETCH_LABELS_SUCCESS:
      return fetchLabelsSuccess(state, action);
    case actionTypes.FETCH_LABEL_SUCCESS:
      return fetchLabelSuccess(state, action);
    case actionTypes.ADD_LABEL_CLIENT_PREP:
      return addLabelClientPrep(state, action);
    case actionTypes.ADD_LABEL_SUCCESS:
      return addLabelSuccess(state, action);
    case actionTypes.EDIT_LABEL_CLIENT_PREP:
      return editLabelClientPrep(state, action);
    case actionTypes.EDIT_LABEL_CLIENT_INPUT:
      return editLabelClientInput(state, action);
    case actionTypes.UPDATE_LABEL_SUCCESS:
      return updateLabelSuccess(state, action);
    case actionTypes.DELETE_LABEL_SUCCESS:
      return deleteLabelSuccess(state, action);
    default:
      return state;
  }
};

//===============================================================================================================//

export default reducer;
