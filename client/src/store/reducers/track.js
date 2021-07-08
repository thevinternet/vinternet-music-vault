import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/helpers";
import { feTrackObject } from '../../utilities/formHelpers/formElementAttributeBuilder.js'
import { createTrackForm } from "../../utilities/formHelpers/formBuilderTrack";

//===============================================================================================================//

const initialState = {
  tracks: [],
  track: "",
  trackForm: "",
  error: null,
  success: null,
	response: null,
	feedback: null
};

//===============================================================================================================//

// Generic Track Reducer Functions

const trackStartLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const trackReturnFailure = (state, action) => {
  return updateObject(state, { error: action.error.status, response: action.error.response, feedback: action.error.errors, loading: false });
};

const trackResetStatus = (state, action) => {
  return updateObject(state, { error: null, success: null, response: null, feedback: null });
};

const trackResetResults = (state, action) => {
  return updateObject(state, { tracks: [], track: "" });
};


//===============================================================================================================//

// Fetch Tracks Reducer Functions

const fetchTracksSuccess = (state, action) => {
  return updateObject(state, { tracks: action.tracks, loading: false });
};

//===============================================================================================================//

// Fetch Track Reducer Functions

const fetchTrackSuccess = (state, action) => {
    return updateObject(state, { track: action.track, loading: false });
  };
  
//===============================================================================================================//

// Fetch Tracks By Artist Reducer Functions

const fetchTracksByArtistSuccess = (state, action) => {
  return updateObject(state, { tracks: action.tracks, loading: false });
};

//===============================================================================================================//

// Fetch Tracks By Label Reducer Functions

const fetchTracksByLabelSuccess = (state, action) => {
  return updateObject(state, { tracks: action.tracks, loading: false });
};

//===============================================================================================================//

// Fetch Tracks By Release Reducer Functions

const fetchTracksByReleaseSuccess = (state, action) => {
  return updateObject(state, { tracks: action.tracks, loading: false });
};

//===============================================================================================================//

// Add Track Reducer Functions

const addTrackClientPrep = (state, action) => {
	const newTrackObj = feTrackObject();
  const newTrackForm = createTrackForm(newTrackObj);
  return updateObject(state, { trackForm: newTrackForm, loading: false });
};

//===============================================================================================================//

// Edit Track Reducer Functions

const editTrackClientPrep = (state, action) => {

	const updatedTrackForm = createTrackForm(action.tracks);
  
  return updateObject(state, {
    tracks: action.tracks,
    trackForm: updatedTrackForm,
    loading: false
  });
};

const editTrackClientInput = (state, action) => {
  return updateObject(state, { trackForm: action.updatedObject });
};

//===============================================================================================================//

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TRACK_START_LOADING:
			return trackStartLoading(state, action);
		case actionTypes.TRACK_RETURN_FAILURE:
			return trackReturnFailure(state, action);
		case actionTypes.TRACK_RESET_STATUS:
			return trackResetStatus(state, action);
		case actionTypes.TRACK_RESET_RESULTS:
			return trackResetResults(state, action);
		case actionTypes.FETCH_TRACKS_SUCCESS:
			return fetchTracksSuccess(state, action);
		case actionTypes.FETCH_TRACK_SUCCESS:
			return fetchTrackSuccess(state, action);
		case actionTypes.FETCH_TRACKS_BY_ARTIST_SUCCESS:
			return fetchTracksByArtistSuccess(state, action);
		case actionTypes.FETCH_TRACKS_BY_LABEL_SUCCESS:
			return fetchTracksByLabelSuccess(state, action);
		case actionTypes.FETCH_TRACKS_BY_RELEASE_SUCCESS:
			return fetchTracksByReleaseSuccess(state, action);
		case actionTypes.ADD_TRACK_CLIENT_PREP:
			return addTrackClientPrep(state, action);
		case actionTypes.EDIT_TRACK_CLIENT_PREP:
			return editTrackClientPrep(state, action);
		case actionTypes.EDIT_TRACK_CLIENT_INPUT:
			return editTrackClientInput(state, action);
		default:
			return state;
	}
};

//===============================================================================================================//

export default reducer;
