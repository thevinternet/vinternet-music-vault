import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { createArtistForm } from "../../utilities/formHelpers/formBuilderArtist";
import * as feBuilderArtist from "../../utilities/formHelpers/formElementBuilderArtist";
import * as feBuilderGeneric from "../../utilities/formHelpers/formElementBuilderGeneric";

//===============================================================================================================//

const initialState = {
  artists: [],
  artist: "",
  artistForm: "",
  loading: false,
  error: null,
  success: null,
	response: null,
	feedback: null
};

//===============================================================================================================//

// Generic Artist Reducer Functions

const artistStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const artistReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error.status, response: action.error.response, feedback: action.error.errors, loading: false });
};

const artistResetStatus = (state, action) => {
  return updateObject(state, { error: null, success: null, response: null, feedback: null });
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
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

// Edit Artist Reducer Functions

const editArtistClientPrep = (state, action) => {

	const formType = { artistForm : true }; 
	const artistName = feBuilderArtist.artistNameFormElement(action.artist.name, "artistName");
  const realName = feBuilderArtist.realNameFormElement(action.artist.real_name, "realName");
	const artistProfile = feBuilderGeneric.profileFormElement(action.artist.profile, "profile");
	const artistAlias = { aliasNames : feBuilderArtist.aliasNameForm(action.artist.alias_name) };
	const artistWebsite = { websites : feBuilderArtist.websiteForm(action.artist.website) };
	const artistPicture = action.artist.picture.map(feBuilderGeneric.imageUploadFormElement);
	const artistDiscogsId = feBuilderGeneric.discogsIdFormElement(action.artist.discogs_id, "discogsId");

	const updatedArtistForm = Object.assign({},
		formType,
		artistName,
		realName,
		artistProfile,
		artistAlias,
		artistWebsite,
		...artistPicture,
		artistDiscogsId
	);

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
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

// Delete Artist Reducer Functions

const deleteArtistSuccess = (state, action) => {
  return updateObject(state, { success: action.success.status, response: action.success.response, feedback: action.success.feedback, loading: false });
};

//===============================================================================================================//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTIST_START_LOADING:
      return artistStartLoading(state, action);
    case actionTypes.ARTIST_RETURN_FAILURE:
      return artistReturnFailure(state, action);
    case actionTypes.ARTIST_RESET_STATUS:
      return artistResetStatus(state, action);
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
