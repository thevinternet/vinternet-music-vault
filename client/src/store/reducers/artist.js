import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { formAttrInd } from "../../utilities/formHelpers/formAttributeBuilderSingle";
import { formAttrGrp } from "../../utilities/formHelpers/formAttributeBuilderGroup";
import { createArtistForm } from "../../utilities/formHelpers/formBuilderArtist";

//===============================================================================================================//

const initialState = {
  artists: [],
  artist: "",
  artistForm: "",
  loading: false,
  error: null,
  success: null
};

//===============================================================================================================//

// Generic Artist Reducer Functions

const artistStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const artistReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const artistResetReturnStatus = (state, action) => {
  return updateObject(state, { error: null, success: null });
};

//===============================================================================================================//

// Fetch Artists Reducer Functions

const fetchArtistsSuccess = (state, action) => {
  return updateObject(state, { artists: action.artists, loading: false });
};

//===============================================================================================================//

// Fetch Artist Reducer Functions

const fetchArtistSuccess = (state, action) => {
  return updateObject(state, { artist: action.artist, loading: false });
};

//===============================================================================================================//

// Add Artist Reducer Functions

const addArtistClientPrep = (state, action) => {
  const newArtistForm = createArtistForm();
  return updateObject(state, { artistForm: newArtistForm, loading: false });
};

const addArtistSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

// Edit Artist Reducer Functions

const editArtistClientPrep = (state, action) => {

  const artistName = formAttrInd(
    action.artist.name,
    "artistName",
    "input",
    true,
    false
  );
  const updatedArtistName = Object.assign(artistName);

  //=========================================================//

  const realName = formAttrInd(
    action.artist.real_name,
    "realName",
    "input",
    false,
    false
  );
  const updatedRealName = Object.assign(updatedArtistName, realName);

  //=========================================================//

  let aliasName;
  let updatedAliasName;

  if (action.artist.alias_name.length) {
    aliasName = formAttrGrp(
      action.artist.alias_name,
      "aliasName",
      "input",
      false,
      true
    );
    updatedAliasName = Object.assign(updatedRealName, ...aliasName);
  } else {
    aliasName = formAttrInd("", "aliasName", "input", false, true);
    updatedAliasName = Object.assign(updatedRealName, aliasName);
  }

  //=========================================================//

  const artistProfile = formAttrInd(
    action.artist.profile,
    "profile",
    "textarea",
    true,
    false
  );
  const updatedProfile = Object.assign(updatedAliasName, artistProfile);

  //=========================================================//

  const artistWebsite = formAttrGrp(
    action.artist.website,
    "website",
    "input",
    false,
    false
  );
  const updatedWebsite = Object.assign(updatedProfile, ...artistWebsite);

  //=========================================================//

  const artistDiscogsId = formAttrInd(
    action.artist.discogs_id,
    "discogsId",
    "input",
    false,
    false
  );
  const updatedDiscogsId = Object.assign(updatedWebsite, artistDiscogsId);

  //=========================================================//

  const artistPicture = formAttrGrp(
    action.artist.picture,
    "picture",
    "file",
    false,
    false
  );
  const updatedPicture = Object.assign(updatedDiscogsId, ...artistPicture);

  //=========================================================//

  const updatedArtistForm = Object.assign(updatedPicture);

  return updateObject(state, {
    artist: action.artist,
    artistForm: updatedArtistForm,
    loading: false
  });
};

const editArtistClientInput = (state, action) => {
  return updateObject(state, { artistForm: action.updatedObject });
};

//===============================================================================================================//

// Update Artist Reducer Functions

const updateArtistSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

// Delete Artist Reducer Functions

const deleteArtistSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: false });
};

//===============================================================================================================//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTIST_START_LOADING:
      return artistStartLoading(state, action);
    case actionTypes.ARTIST_RETURN_FAILURE:
      return artistReturnFailure(state, action);
    case actionTypes.ARTIST_RESET_RETURN_STATUS:
      return artistResetReturnStatus(state, action);
    case actionTypes.FETCH_ARTISTS_SUCCESS:
      return fetchArtistsSuccess(state, action);
    case actionTypes.FETCH_ARTIST_SUCCESS:
      return fetchArtistSuccess(state, action);
    case actionTypes.ADD_ARTIST_CLIENT_PREP:
      return addArtistClientPrep(state, action);
    case actionTypes.ADD_ARTIST_SUCCESS:
      return addArtistSuccess(state, action);
    case actionTypes.EDIT_ARTIST_CLIENT_PREP:
      return editArtistClientPrep(state, action);
    case actionTypes.EDIT_ARTIST_CLIENT_INPUT:
      return editArtistClientInput(state, action);
    case actionTypes.UPDATE_ARTIST_SUCCESS:
      return updateArtistSuccess(state, action);
    case actionTypes.DELETE_ARTIST_SUCCESS:
      return deleteArtistSuccess(state, action);
    default:
      return state;
  }
};

//===============================================================================================================//

export default reducer;
