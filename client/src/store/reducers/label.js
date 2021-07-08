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
  success: null,
	response: null,
	feedback: null
};

//===============================================================================================================//

// Generic Label Reducer Functions

const labelStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const labelReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error.status, response: action.error.response, feedback: action.error.errors, loading: false });
};

const labelResetStatus = (state, action) => {
  return updateObject(state, { error: null, success: null, response: null, feedback: null });
};

//===============================================================================================================//

// Fetch Labels Reducer Functions

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
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

// Edit Label Reducer Functions

const editLabelClientPrep = (state, action) => {

	const formType = { labelForm : true }; 
	const labelName = feBuilderLabel.labelNameFormElement(action.label.name, "labelName");
	const labelProfile = feBuilderGeneric.profileFormElement(action.label.profile, "profile");
	const parentLabel = { parentLabel : feBuilderLabel.parentLabelForm(action.label.parent_label) };
	const subsidiaryLabel = { subsidiaryLabels : feBuilderLabel.subsidiaryLabelForm(action.label.subsidiary_label) };
	const labelWebsite = { websites : feBuilderLabel.websiteForm(action.label.website) };
	const labelPicture = action.label.picture.map(feBuilderGeneric.imageUploadFormElement);
  const labelDiscogsId = feBuilderGeneric.discogsIdFormElement(action.label.discogs_id, "discogsId");

	const updatedLabelForm = Object.assign({},
		formType, 
		labelName,
		labelProfile,
		parentLabel,
		subsidiaryLabel,		
		labelWebsite,
		...labelPicture,
		labelDiscogsId
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
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

// Delete Label Reducer Functions

const deleteLabelSuccess = (state, action) => {
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LABEL_START_LOADING:
      return labelStartLoading(state, action);
    case actionTypes.LABEL_RETURN_FAILURE:
      return labelReturnFailure(state, action);
    case actionTypes.LABEL_RESET_STATUS:
      return labelResetStatus(state, action);
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
