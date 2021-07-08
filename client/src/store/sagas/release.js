import { put } from "redux-saga/effects";
import axios from "../../utilities/axios";

import * as actions from "../actions/index";

//===============================================================================================================//

export function* fetchReleasesSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    const response = yield axios.get("/api/release");
    const fetchedReleases = [];
    for (let key in response.data) {
      fetchedReleases.push({
        ...response.data[key],
        id: key
      });
    }
    response.data.error
      ? yield put(actions.releaseReturnFailure(response.data.error))
      : yield put(actions.fetchReleasesSuccess(fetchedReleases));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* fetchReleaseSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    const response = yield axios.get("/api/release/" + action.id);
    if (response.data.error) {
      yield put(actions.releaseReturnFailure(response.data.error));
    }
    action.edit === true
      ? yield put(actions.editReleaseClientPrep(response.data))
      : yield put(actions.fetchReleaseSuccess(response.data));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* fetchReleasesByArtistSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    const response = yield axios.get("/api/release/artist/" + action.id);
    const fetchedReleases = [];
    for (let key in response.data) {
      fetchedReleases.push({
        ...response.data[key],
        id: key
      });
    }
    response.data.error
      ? yield put(actions.releaseReturnFailure(response.data.error))
      : yield put(actions.fetchReleasesByArtistSuccess(fetchedReleases));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}
  
//===============================================================================================================//

export function* fetchReleasesByLabelSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    const response = yield axios.get("/api/release/label/" + action.id);
    const fetchedReleases = [];
    for (let key in response.data) {
      fetchedReleases.push({
        ...response.data[key],
        id: key
      });
    }
    response.data.error
      ? yield put(actions.releaseReturnFailure(response.data.error))
      : yield put(actions.fetchReleasesByLabelSuccess(fetchedReleases));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* addReleaseSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    let response;
    action.file === true
      ? (response = yield axios.post("/api/release/new/file", action.label))
      : (response = yield axios.post("/api/release/new/text", action.label));
    response.data.success
      ? yield put(actions.addReleaseSuccess(response.data.success))
      : yield put(actions.releaseReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* updateReleaseSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    let response;
    action.file === true
      ? (response = yield axios.put(
          "/api/release/" + action.id + "/update/file",
          action.release
        ))
      : (response = yield axios.put(
          "/api/release/" + action.id + "/update/text",
          action.release
        ));
    response.data.success
      ? yield put(actions.updateReleaseSuccess(response.data.success))
      : yield put(actions.releaseReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* deleteReleaseSendSaga(action) {
  yield put(actions.releaseStartLoading());
  try {
    const response = yield axios.delete("/api/release/" + action.id);
    response.data.success
      ? yield put(actions.deleteReleaseSuccess(response.data.success))
      : yield put(actions.releaseReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.releaseReturnFailure(error.message));
  }
}

//===============================================================================================================//
