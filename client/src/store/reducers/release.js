import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { formAttrInd } from "../../utilities/formHelpers/formAttributeBuilderSingle";
import { formAttrGrp } from "../../utilities/formHelpers/formAttributeBuilderGroup";
import { formAttrTrk } from "../../utilities/formHelpers/formAttributeBuilderTrack";
import { createReleaseForm } from "../../utilities/formHelpers/formBuilderRelease";

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
  
  // let artistName;
  // let updatedArtistName;

  // if (action.release.artist_name.length) {
  //   artistName = formAttrGrp(
  //     action.release.artist_name,
  //     "artistName",
  //     "input",
  //     false,
  //     true
  //   );
  //   updatedArtistName = Object.assign(...artistName);
  // } else {
  //   artistName = formAttrInd("", "artistName", "input", false, true);
  //   updatedArtistName = Object.assign(artistName);
  // }

  //=========================================================//

  const releaseTitle = formAttrInd(
    action.release.title,
    "releaseTitle",
    "input",
    true,
    false
  );
  //const updatedReleaseTitle = Object.assign(updatedArtistName, releaseTitle);
  const updatedReleaseTitle = Object.assign(releaseTitle);

  //=========================================================//

  let labelName;
  let updatedLabelName;

  if (action.release.label_name.length) {
    labelName = formAttrGrp(
      action.release.label_name,
      "labelName",
      "input",
      false,
      true
    );
    updatedLabelName = Object.assign(updatedReleaseTitle, ...labelName);
  } else {
    labelName = formAttrInd("", "labelName", "input", false, true);
    updatedLabelName = Object.assign(updatedReleaseTitle, labelName);
  }

  //=========================================================//

  const catalogue = formAttrInd(
    action.release.catalogue,
    "catalogue",
    "input",
    false,
    false
  );
  const updatedCatalogue = Object.assign(updatedLabelName, catalogue);

  //=========================================================//

  const releaseYear = formAttrInd(
    action.release.year,
    "releaseYear",
    "input",
    false,
    false
  );
  const updatedReleaseYear = Object.assign(updatedCatalogue, releaseYear);

  //=========================================================//

  let releaseFormat;
  let updatedReleaseFormat;

  if (action.release.format.length) {
    releaseFormat = formAttrGrp(
      action.release.format,
      "releaseFormat",
      "checkbox",
      false,
      false
    );
    updatedReleaseFormat = Object.assign(updatedReleaseYear, ...releaseFormat);
  } else {
    releaseFormat = formAttrInd("", "releaseFormat", "checkbox", false, false);
    updatedReleaseFormat = Object.assign(updatedReleaseYear, releaseFormat);
  }

  //=========================================================//

  const releaseDiscogsUrl = formAttrInd(
    action.release.discogs_url,
    "discogsLink",
    "input",
    false,
    false
  );
  const updatedReleaseDiscogsUrl = Object.assign(updatedReleaseFormat, releaseDiscogsUrl);

  //=========================================================//

  const releaseDiscogsId = formAttrInd(
    action.release.discogs_id,
    "discogsId",
    "input",
    false,
    false
  );
  const updatedReleaseDiscogsId = Object.assign(updatedReleaseDiscogsUrl, releaseDiscogsId);

  //=========================================================//

  const releasePicture = formAttrGrp(
    action.release.picture,
    "picture",
    "file",
    false,
    false
  );
  const updatedReleasePicture = Object.assign(updatedReleaseDiscogsId, ...releasePicture);

  //=========================================================//

  let releaseTracks;
  let updatedReleaseTracks

  if (action.release.track.length) {
    releaseTracks = formAttrTrk(
      action.release.track
    )
    const tracks = { tracks : releaseTracks };
    updatedReleaseTracks = Object.assign(updatedReleasePicture, tracks)
  }
  
  const updatedReleaseForm = Object.assign(updatedReleaseTracks);

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
  