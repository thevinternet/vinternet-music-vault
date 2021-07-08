import { put } from "redux-saga/effects";
import axios from "../../utilities/axios";

import * as actions from "../actions/index";

//===============================================================================================================//

export function* fetchLabelsSendSaga(action) {
  yield put(actions.labelStartLoading());
  try {
    const response = yield axios.get("/api/label");
    const fetchedLabels = [];
    for (let key in response.data) {
      fetchedLabels.push({
        ...response.data[key],
        id: key
      });
    }
    response.data.error
      ? yield put(actions.labelReturnFailure(response.data.error))
      : yield put(actions.fetchLabelsSuccess(fetchedLabels));
  } catch (error) {
    yield put(actions.labelReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* fetchLabelSendSaga(action) {
  yield put(actions.labelStartLoading());
  try {
    const response = yield axios.get("/api/label/" + action.id);
    if (response.data.error) {
      yield put(actions.labelReturnFailure(response.data.error));
    }
		else {
			action.edit === true
      ? yield put(actions.editLabelClientPrep(response.data))
      : yield put(actions.fetchLabelSuccess(response.data));
		}
  } catch (error) {
    yield put(actions.labelReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* addLabelSendSaga(action) {
  yield put(actions.labelStartLoading());
  try {
    let response;
    action.file === true
      ? (response = yield axios.post("/api/label/new/file", action.label))
      : (response = yield axios.post("/api/label/new/text", action.label));
    response.data.success
      ? yield put(actions.addLabelSuccess(response.data.success))
      : yield put(actions.labelReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.labelReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* updateLabelSendSaga(action) {
  yield put(actions.labelStartLoading());
  try {
    let response;
    action.file === true
      ? (response = yield axios.put(
          "/api/label/" + action.id + "/update/file",
          action.label
        ))
      : (response = yield axios.put(
          "/api/label/" + action.id + "/update/text",
          action.label
        ));
    response.data.success
      ? yield put(actions.updateLabelSuccess(response.data.success))
      : yield put(actions.labelReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.labelReturnFailure(error.message));
  }
}

//===============================================================================================================//

export function* deleteLabelSendSaga(action) {
  yield put(actions.labelStartLoading());
  try {
    const response = yield axios.delete("/api/label/" + action.id);
    response.data.success
      ? yield put(actions.deleteLabelSuccess(response.data.success))
      : yield put(actions.labelReturnFailure(response.data.error));
  } catch (error) {
    yield put(actions.labelReturnFailure(error.message));
  }
}

//===============================================================================================================//
