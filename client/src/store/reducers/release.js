import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { createReleaseForm } from "../../utilities/formHelpers/formBuilderRelease";
import * as feBuilderRelease from "../../utilities/formHelpers/formElementBuilderRelease";
import * as feBuilderGeneric from "../../utilities/formHelpers/formElementBuilderGeneric";


//===============================================================================================================//

const initialState = {
  releases: [],
  release: "",
  releaseForm: "",
  loading: false,
  error: null,
  success: null,
	response: null,
	feedback: null
};

//===============================================================================================================//

// Generic Release Reducer Functions

const releaseStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const releaseReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error.status, response: action.error.response, feedback: action.error.errors, loading: false });
};

const releaseResetStatus = (state, action) => {
  return updateObject(state, { error: null, success: null, response: null, feedback: null });
};

const releaseResetResults = (state, action) => {
  return updateObject(state, { releases: [], release: "" });
};

//===============================================================================================================//

// Fetch Releases Reducer Functions

const fetchReleasesSuccess = (state, action) => {
  return updateObject(state, { releases: action.releases, loading: false });
};

//===============================================================================================================//

// Fetch Release Reducer Functions

const fetchReleaseSuccess = (state, action) => {
    return updateObject(state, { release: action.release, loading: false });
  };
  
//===============================================================================================================//

// Fetch Releases By Artist Reducer Functions

const fetchReleasesByArtistSuccess = (state, action) => {
  return updateObject(state, { releases: action.releases, loading: false });
};

//===============================================================================================================//

// Fetch Releases By Label Reducer Functions

const fetchReleasesByLabelSuccess = (state, action) => {
  return updateObject(state, { releases: action.releases, loading: false });
};

//===============================================================================================================//

// Add Release Reducer Functions

const addReleaseClientPrep = (state, action) => {
  const newReleaseForm = createReleaseForm();
  return updateObject(state, { releaseForm: newReleaseForm, loading: false });
};

const addReleaseSuccess = (state, action) => {
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

// Edit Release Reducer Functions

const editReleaseClientPrep = (state, action) => {

	const formType = { releaseForm : true }; 
	const releaseTitle = feBuilderRelease.releaseTitleFormElement(action.release.title, "releaseTitle");
	const releaseLabel = { label : feBuilderRelease.releaseLabelForm(action.release.label_name) };	
	const releaseCatalogue = feBuilderRelease.releaseCatalogueFormElement(action.release.catalogue, "catalogue");
	const releaseYear = feBuilderRelease.releaseYearFormElement(action.release.year, "releaseYear");
	const releaseDiscogsId = feBuilderGeneric.discogsIdFormElement(action.release.discogs_id, "discogsId");
	const releaseDiscogsUrl = feBuilderGeneric.discogsUrlFormElement(action.release.discogs_url, "discogsLink");
	const releaseFormat = { formats : feBuilderRelease.releaseFormatForm(action.release.format) };
	const releasePicture = action.release.picture.map(feBuilderGeneric.imageUploadFormElement);

	const updatedReleaseForm = Object.assign({},
		formType,
		releaseTitle,
		releaseLabel,
		releaseCatalogue,
		releaseYear,
		releaseDiscogsId,
		releaseDiscogsUrl,
		releaseFormat,
		...releasePicture,
	);

  //=========================================================//
  
  return updateObject(state, {
    release: action.release,
    releaseForm: updatedReleaseForm,
    loading: false
  });
};

const editReleaseClientInput = (state, action) => {
  return updateObject(state, { releaseForm: action.updatedObject });
};

//===============================================================================================================//

// Update Release Reducer Functions

const updateReleaseSuccess = (state, action) => {
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

// Delete Release Reducer Functions

const deleteReleaseSuccess = (state, action) => {
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.RELEASE_START_LOADING:
        return releaseStartLoading(state, action);
      case actionTypes.RELEASE_RETURN_FAILURE:
        return releaseReturnFailure(state, action);
      case actionTypes.RELEASE_RESET_STATUS:
        return releaseResetStatus(state, action);
			case actionTypes.RELEASE_RESET_RESULTS:
				return releaseResetResults(state, action);
      case actionTypes.FETCH_RELEASES_SUCCESS:
        return fetchReleasesSuccess(state, action);
      case actionTypes.FETCH_RELEASE_SUCCESS:
        return fetchReleaseSuccess(state, action);
      case actionTypes.FETCH_RELEASES_BY_ARTIST_SUCCESS:
        return fetchReleasesByArtistSuccess(state, action);
      case actionTypes.FETCH_RELEASES_BY_LABEL_SUCCESS:
        return fetchReleasesByLabelSuccess(state, action);
      case actionTypes.ADD_RELEASE_CLIENT_PREP:
        return addReleaseClientPrep(state, action);
      case actionTypes.ADD_RELEASE_SUCCESS:
        return addReleaseSuccess(state, action);
      case actionTypes.EDIT_RELEASE_CLIENT_PREP:
        return editReleaseClientPrep(state, action);
      case actionTypes.EDIT_RELEASE_CLIENT_INPUT:
        return editReleaseClientInput(state, action);
      case actionTypes.UPDATE_RELEASE_SUCCESS:
        return updateReleaseSuccess(state, action);
      case actionTypes.DELETE_RELEASE_SUCCESS:
        return deleteReleaseSuccess(state, action);
      default:
        return state;
    }
  };
  
  //===============================================================================================================//
  
  export default reducer;
  