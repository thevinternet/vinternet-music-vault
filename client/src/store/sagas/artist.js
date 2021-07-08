import { put } from "redux-saga/effects";
import axios from "../../utilities/axios";

import * as actions from "../actions/index";

//===============================================================================================================//

export function* fetchArtistsSendSaga(action) {
  yield put(actions.artistStartLoading());
  try {
    const response = yield axios.get("/api/artist");
    const fetchedArtists = [];
    for (let key in response.data) {
      fetchedArtists.push({
        ...response.data[key],
        id: key
      });
    }
    response.data.error
      ? yield put(actions.artistReturnFailure(response.data.error))
      : yield put(actions.fetchArtistsSuccess(fetchedArtists));
  } catch (error) {
    yield put(actions.artistReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* fetchArtistSendSaga(action) {
  yield put(actions.artistStartLoading());
  try {
    const response = yield axios.get("/api/artist/" + action.id);
    if (response.data.error) {
      yield put(actions.artistReturnFailure(response.data.error));
    } 
		else {
			action.edit === true
      ? yield put(actions.editArtistClientPrep(response.data))
      : yield put(actions.fetchArtistSuccess(response.data));
		}
  } catch (error) {
    yield put(actions.artistReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* addArtistSendSaga(action) {
  yield put(actions.artistStartLoading());
  try {
    let response;
    action.file === true
      ? (response = yield axios.post("/api/artist/new/file", action.artist))
      : (response = yield axios.post("/api/artist/new/text", action.artist));
    response.data.success
      ? yield put(actions.addArtistSuccess(response.data.success))
      : yield put(actions.artistReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.artistReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* updateArtistSendSaga(action) {
  yield put(actions.artistStartLoading());
  try {
    let response;
    action.file === true
      ? (response = yield axios.put(
          "/api/artist/" + action.id + "/update/file",
          action.artist
        ))
      : (response = yield axios.put(
          "/api/artist/" + action.id + "/update/text",
          action.artist
        ));
    response.data.success
      ? yield put(actions.updateArtistSuccess(response.data.success))
      : yield put(actions.artistReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.artistReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* deleteArtistSendSaga(action) {
  yield put(actions.artistStartLoading());
  try {
    const response = yield axios.delete("/api/artist/" + action.id);
    response.data.success
      ? yield put(actions.deleteArtistSuccess(response.data.success))
      : yield put(actions.artistReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.artistReturnFailure(error.message));
  }
}

//===============================================================================================================//
