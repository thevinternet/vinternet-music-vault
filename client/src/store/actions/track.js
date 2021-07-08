import * as actionTypes from "./actionTypes";

//===============================================================================================================//

// Generic Track Action Creators

export const trackStartLoading = () => {
  return {
    type: actionTypes.TRACK_START_LOADING
  };
};

export const trackReturnFailure = error => {
  return {
    type: actionTypes.TRACK_RETURN_FAILURE,
    error: error
  };
};

export const trackResetStatus = () => {
  return {
    type: actionTypes.TRACK_RESET_STATUS
  };
};

export const trackResetResults = () => {
  return {
    type: actionTypes.TRACK_RESET_RESULTS
  };
};

//===============================================================================================================//

// Action Creators for retreiving Tracks from database

export const fetchTracksSuccess = tracks => {
  return {
    type: actionTypes.FETCH_TRACKS_SUCCESS,
    tracks: tracks
  };
};

export const fetchTracksSend = () => {
  return {
    type: actionTypes.FETCH_TRACKS_SEND
  };
};

//===============================================================================================================//

// Action Creators for retreiving single Track from database

export const fetchTrackSuccess = track => {
  return {
    type: actionTypes.FETCH_TRACK_SUCCESS,
    track: track
  };
};

export const fetchTrackSend = (trackId, edit) => {
  return {
    type: actionTypes.FETCH_TRACK_SEND,
    id: trackId,
    edit: edit
  };
};

//===============================================================================================================//

// Action Creators for retreiving Tracks By Artist from database

export const fetchTracksByArtistSuccess = tracks => {
  return {
    type: actionTypes.FETCH_TRACKS_BY_ARTIST_SUCCESS,
    tracks: tracks
  };
};

export const fetchTracksByArtistSend = (artistId) => {
  return {
    type: actionTypes.FETCH_TRACKS_BY_ARTIST_SEND,
    id: artistId
  };
};

//===============================================================================================================//

// Action Creators for retreiving Tracks By Label from database

export const fetchTracksByLabelSuccess = tracks => {
  return {
    type: actionTypes.FETCH_TRACKS_BY_LABEL_SUCCESS,
    tracks: tracks
  };
};

export const fetchTracksByLabelSend = (labelId) => {
  return {
    type: actionTypes.FETCH_TRACKS_BY_LABEL_SEND,
    id: labelId
  };
};

//===============================================================================================================//

// Action Creators for retreiving Tracks By Release from database

export const fetchTracksByReleaseSuccess = tracks => {
  return {
    type: actionTypes.FETCH_TRACKS_BY_RELEASE_SUCCESS,
    tracks: tracks
  };
};

export const fetchTracksByReleaseSend = (releaseId, edit) => {
  return {
    type: actionTypes.FETCH_TRACKS_BY_RELEASE_SEND,
		id: releaseId,
		edit: edit
  };
};
//===============================================================================================================//

// Action Creators for adding Tracks to database

export const addTrackClientPrep = () => {
  return {
    type: actionTypes.ADD_TRACK_CLIENT_PREP
  };
};

//===============================================================================================================//

// Action Creators for editing Track data client side

export const editTrackClientPrep = tracks => {
  return {
    type: actionTypes.EDIT_TRACK_CLIENT_PREP,
    tracks: tracks
  };
};

export const editTrackClientInput = updatedObject => {
  return {
    type: actionTypes.EDIT_TRACK_CLIENT_INPUT,
    updatedObject: updatedObject
  };
};

//===============================================================================================================//
