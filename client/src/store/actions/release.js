import * as actionTypes from "./actionTypes";

//===============================================================================================================//

// Generic Release Action Creators

export const releaseStartLoading = () => {
  return {
    type: actionTypes.RELEASE_START_LOADING
  };
};

export const releaseReturnFailure = error => {
  return {
    type: actionTypes.RELEASE_RETURN_FAILURE,
    error: error
  };
};

export const releaseResetStatus = () => {
  return {
    type: actionTypes.RELEASE_RESET_STATUS
  };
};

export const releaseResetResults = () => {
  return {
    type: actionTypes.RELEASE_RESET_RESULTS
  };
};

//===============================================================================================================//

// Action Creators for retreiving Releases from database

export const fetchReleasesSuccess = releases => {
  return {
    type: actionTypes.FETCH_RELEASES_SUCCESS,
    releases: releases
  };
};

export const fetchReleasesSend = () => {
  return {
    type: actionTypes.FETCH_RELEASES_SEND
  };
};

//===============================================================================================================//

// Action Creators for retreiving single Release from database

export const fetchReleaseSuccess = release => {
  return {
    type: actionTypes.FETCH_RELEASE_SUCCESS,
    release: release
  };
};

export const fetchReleaseSend = (releaseId, edit) => {
  return {
    type: actionTypes.FETCH_RELEASE_SEND,
    id: releaseId,
    edit: edit
  };
};

//===============================================================================================================//

// Action Creators for retreiving Releases By Artist from database

export const fetchReleasesByArtistSuccess = releases => {
  return {
    type: actionTypes.FETCH_RELEASES_BY_ARTIST_SUCCESS,
    releases: releases
  };
};

export const fetchReleasesByArtistSend = (artistId) => {
  return {
    type: actionTypes.FETCH_RELEASES_BY_ARTIST_SEND,
    id: artistId
  };
};

//===============================================================================================================//

// Action Creators for retreiving Releases By Label from database

export const fetchReleasesByLabelSuccess = releases => {
  return {
    type: actionTypes.FETCH_RELEASES_BY_LABEL_SUCCESS,
    releases: releases
  };
};

export const fetchReleasesByLabelSend = (labelId) => {
  return {
    type: actionTypes.FETCH_RELEASES_BY_LABEL_SEND,
    id: labelId
  };
};

//===============================================================================================================//

// Action Creators for adding single Release to database

export const addReleaseClientPrep = () => {
  return {
    type: actionTypes.ADD_RELEASE_CLIENT_PREP
  };
};

export const addReleaseSuccess = success => {
  return {
    type: actionTypes.ADD_RELEASE_SUCCESS,
    success: success
  };
};

export const addReleaseSend = (releaseData, fileFlag) => {
  return {
    type: actionTypes.ADD_RELEASE_SEND,
    label: releaseData,
    file: fileFlag
  };
};

//===============================================================================================================//

// Action Creators for editing Release data client side

export const editReleaseClientPrep = release => {
  return {
    type: actionTypes.EDIT_RELEASE_CLIENT_PREP,
    release: release
  };
};

export const editReleaseClientInput = updatedObject => {
  return {
    type: actionTypes.EDIT_RELEASE_CLIENT_INPUT,
    updatedObject: updatedObject
  };
};

//===============================================================================================================//

// Action Creators for updating single Release on database

export const updateReleaseSuccess = success => {
  return {
    type: actionTypes.UPDATE_RELEASE_SUCCESS,
    success: success
  };
};

export const updateReleaseSend = (releaseId, releaseData, fileFlag) => {
  return {
    type: actionTypes.UPDATE_RELEASE_SEND,
    id: releaseId,
    release: releaseData,
    file: fileFlag
  };
};

//===============================================================================================================//

// Action Creators for deleting a single Release from database

export const deleteReleaseSuccess = success => {
  return {
    type: actionTypes.DELETE_RELEASE_SUCCESS,
    success: success
  };
};

export const deleteReleaseSend = releaseId => {
  return {
    type: actionTypes.DELETE_RELEASE_SEND,
    id: releaseId
  };
};

//===============================================================================================================//
