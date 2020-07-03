import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { createLabelForm } from "../../utilities/formHelpers/formBuilderLabel";
import * as feBuilderLabel from "../../utilities/formHelpers/formElementBuilderLabel";
import * as feBuilderGeneric from "../../utilities/formHelpers/formElementBuilderGeneric";


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

  const labelName = feBuilderLabel.labelNameFormElement(action.label.name, "labelName");

	let parentLabel = [];

	action.label.parent_label.length ?
	parentLabel = action.label.parent_label.map(feBuilderLabel.parentLabelFormElement) :
	parentLabel.push(feBuilderLabel.parentLabelFormElement("", 0));

	let subsidiaryLabel = [];

	action.label.subsidiary_label.length ?
	subsidiaryLabel = action.label.subsidiary_label.map(feBuilderLabel.subsidiaryLabelFormElement) :
	subsidiaryLabel.push(feBuilderLabel.subsidiaryLabelFormElement("", 0));

	const labelProfile = feBuilderGeneric.profileFormElement(action.label.profile, "profile");

	const labelWebsite = action.label.website.map(feBuilderGeneric.websiteFormElement);

  const labelDiscogsId = feBuilderGeneric.discogsIdFormElement(action.label.discogs_id, "discogsId");
	
	const labelPicture = action.label.picture.map(feBuilderGeneric.imageUploadFormElement);

  //=========================================================//

	const updatedLabelForm = Object.assign({}, 
		labelName,
		...parentLabel,
		...subsidiaryLabel,
		labelProfile,
		...labelWebsite,
		labelDiscogsId,
		...labelPicture
	);

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
