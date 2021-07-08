import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

//===============================================================================================================//

import {
  fetchArtistsSendSaga,
  fetchArtistSendSaga,
  addArtistSendSaga,
  updateArtistSendSaga,
  deleteArtistSendSaga
} from "./artist";

//===============================================================================================================//

import {
  fetchLabelsSendSaga,
  fetchLabelSendSaga,
  addLabelSendSaga,
  updateLabelSendSaga,
  deleteLabelSendSaga
} from "./label";

//===============================================================================================================//

import {
  fetchReleasesSendSaga,
  fetchReleaseSendSaga,
  fetchReleasesByArtistSendSaga,
  fetchReleasesByLabelSendSaga,
  addReleaseSendSaga,
  updateReleaseSendSaga,
  deleteReleaseSendSaga
} from "./release";

//===============================================================================================================//

import {
  fetchTracksSendSaga,
  fetchTrackSendSaga,
  fetchTracksByArtistSendSaga,
	fetchTracksByLabelSendSaga,
	fetchTracksByReleaseSendSaga
} from "./track";

//===============================================================================================================//

export function* watchArtist() {
  yield takeEvery(actionTypes.FETCH_ARTISTS_SEND, fetchArtistsSendSaga);
  yield takeEvery(actionTypes.FETCH_ARTIST_SEND, fetchArtistSendSaga);
  yield takeEvery(actionTypes.ADD_ARTIST_SEND, addArtistSendSaga);
  yield takeEvery(actionTypes.UPDATE_ARTIST_SEND, updateArtistSendSaga);
  yield takeEvery(actionTypes.DELETE_ARTIST_SEND, deleteArtistSendSaga);
}

//===============================================================================================================//

export function* watchLabel() {
  yield takeEvery(actionTypes.FETCH_LABELS_SEND, fetchLabelsSendSaga);
  yield takeEvery(actionTypes.FETCH_LABEL_SEND, fetchLabelSendSaga);
  yield takeEvery(actionTypes.ADD_LABEL_SEND, addLabelSendSaga);
  yield takeEvery(actionTypes.UPDATE_LABEL_SEND, updateLabelSendSaga);
  yield takeEvery(actionTypes.DELETE_LABEL_SEND, deleteLabelSendSaga);
}

//===============================================================================================================//

export function* watchRelease() {
  yield takeEvery(actionTypes.FETCH_RELEASES_SEND, fetchReleasesSendSaga);
  yield takeEvery(actionTypes.FETCH_RELEASE_SEND, fetchReleaseSendSaga);
  yield takeEvery(actionTypes.FETCH_RELEASES_BY_ARTIST_SEND, fetchReleasesByArtistSendSaga);
  yield takeEvery(actionTypes.FETCH_RELEASES_BY_LABEL_SEND, fetchReleasesByLabelSendSaga);
  yield takeEvery(actionTypes.ADD_RELEASE_SEND, addReleaseSendSaga);
  yield takeEvery(actionTypes.UPDATE_RELEASE_SEND, updateReleaseSendSaga);
  yield takeEvery(actionTypes.DELETE_RELEASE_SEND, deleteReleaseSendSaga);
}

//===============================================================================================================//

export function* watchTrack() {
  yield takeEvery(actionTypes.FETCH_TRACKS_SEND, fetchTracksSendSaga);
  yield takeEvery(actionTypes.FETCH_TRACK_SEND, fetchTrackSendSaga);
  yield takeEvery(actionTypes.FETCH_TRACKS_BY_ARTIST_SEND, fetchTracksByArtistSendSaga);
	yield takeEvery(actionTypes.FETCH_TRACKS_BY_LABEL_SEND, fetchTracksByLabelSendSaga);
	yield takeEvery(actionTypes.FETCH_TRACKS_BY_RELEASE_SEND, fetchTracksByReleaseSendSaga);
}

//===============================================================================================================//
