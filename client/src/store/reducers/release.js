import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { createReleaseForm } from "../../utilities/formHelpers/formBuilderRelease";
import { createTrackForm } from "../../utilities/formHelpers/formBuilderTrack";
import * as feBuilderRelease from "../../utilities/formHelpers/formElementBuilderRelease";
import * as feBuilderGeneric from "../../utilities/formHelpers/formElementBuilderGeneric";


//===============================================================================================================//

const initialState = {
  releases: [],
  release: "",
  releaseForm: "",
  loading: false,
  error: null,
  success: null
};

//===============================================================================================================//

// Generic Release Reducer Functions

const releaseStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const releaseReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const releaseResetReturnStatus = (state, action) => {
  return updateObject(state, { error: null, success: null });
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
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

// Edit Release Reducer Functions

const editReleaseClientPrep = (state, action) => {

	const releaseTitle = feBuilderRelease.releaseTitleFormElement(action.release.title, "releaseTitle");

	let releaseLabel = [];

	action.release.label_name.length ?
	releaseLabel = action.release.label_name.map(feBuilderRelease.releaseLabelFormElement) :
	releaseLabel.push(feBuilderRelease.releaseLabelFormElement("", 0));
	
	const releaseCatalogue = feBuilderRelease.releaseCatalogueFormElement(action.release.catalogue, "catalogue");
	
	const releaseYear = feBuilderRelease.releaseYearFormElement(action.release.year, "releaseYear");

	let releaseFormat = [];

	action.release.format.length ?
	releaseFormat = action.release.format.map(feBuilderRelease.releaseFormatFormElement) :
	releaseFormat.push(feBuilderRelease.releaseFormatFormElement("", 0));

	const releaseDiscogsId = feBuilderGeneric.discogsIdFormElement(action.release.discogs_id, "discogsId");

	const releaseDiscogsUrl = feBuilderGeneric.discogsUrlFormElement(action.release.discogs_url, "discogsLink");

	const releasePicture = action.release.picture.map(feBuilderGeneric.imageUploadFormElement);

	const releaseTracks = { tracks: createTrackForm(action.release.track) };

	//=========================================================//

	const updatedReleaseForm = Object.assign({}, 
		releaseTitle,
		...releaseLabel,
		releaseCatalogue,
		releaseYear,
		...releaseFormat,
		releaseDiscogsId,
		releaseDiscogsUrl,
		...releasePicture,
		releaseTracks
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
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

// Delete Release Reducer Functions

const deleteReleaseSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.RELEASE_START_LOADING:
        return releaseStartLoading(state, action);
      case actionTypes.RELEASE_RETURN_FAILURE:
        return releaseReturnFailure(state, action);
      case actionTypes.RELEASE_RESET_RETURN_STATUS:
        return releaseResetReturnStatus(state, action);
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
  