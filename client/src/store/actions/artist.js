import * as actionTypes from "./actionTypes";

//===============================================================================================================//

// Generic Artist Action Creators

export const artistStartLoading = () => {
  return {
    type: actionTypes.ARTIST_START_LOADING
  };
};

export const artistReturnFailure = error => {
  return {
    type: actionTypes.ARTIST_RETURN_FAILURE,
    error: error
  };
};

export const artistResetStatus = () => {
  return {
    type: actionTypes.ARTIST_RESET_STATUS
  };
};

//===============================================================================================================//

// Action Creators for retreiving Artists from database

export const fetchArtistsSuccess = artists => {
  return {
    type: actionTypes.FETCH_ARTISTS_SUCCESS,
    artists: artists
  };
};

export const fetchArtistsSend = () => {
  return {
    type: actionTypes.FETCH_ARTISTS_SEND
  };
};

//===============================================================================================================//

// Action Creators for retreiving single Artist from database

export const fetchArtistSuccess = artist => {
  return {
    type: actionTypes.FETCH_ARTIST_SUCCESS,
    artist: artist
  };
};

export const fetchArtistSend = (artistId, edit) => {
  return {
    type: actionTypes.FETCH_ARTIST_SEND,
    id: artistId,
    edit: edit
  };
};

//===============================================================================================================//

// Action Creators for adding single Artist from database

export const addArtistClientPrep = () => {
  return {
    type: actionTypes.ADD_ARTIST_CLIENT_PREP
  };
};

export const addArtistSuccess = success => {
  return {
    type: actionTypes.ADD_ARTIST_SUCCESS,
    success: success
  };
};

export const addArtistSend = (artistData, fileFlag) => {
  return {
    type: actionTypes.ADD_ARTIST_SEND,
    artist: artistData,
    file: fileFlag
  };
};

//===============================================================================================================//

// Action Creators for editing Artist data client side

export const editArtistClientPrep = artist => {
  return {
    type: actionTypes.EDIT_ARTIST_CLIENT_PREP,
    artist: artist
  };
};

export const editArtistClientInput = updatedObject => {
  return {
    type: actionTypes.EDIT_ARTIST_CLIENT_INPUT,
    updatedObject: updatedObject
  };
};

//===============================================================================================================//

// Action Creators for updating single Artist on database

export const updateArtistSuccess = success => {
  return {
    type: actionTypes.UPDATE_ARTIST_SUCCESS,
    success: success
  };
};

export const updateArtistSend = (artistId, artistData, fileFlag) => {
  return {
    type: actionTypes.UPDATE_ARTIST_SEND,
    id: artistId,
    artist: artistData,
    file: fileFlag
  };
};

//===============================================================================================================//

// Action Creators for deleting a single Artist from database

export const deleteArtistSuccess = success => {
  return {
    type: actionTypes.DELETE_ARTIST_SUCCESS,
    success: success
  };
};

export const deleteArtistSend = artistId => {
  return {
    type: actionTypes.DELETE_ARTIST_SEND,
    id: artistId
  };
};

//===============================================================================================================//
