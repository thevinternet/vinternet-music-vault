import * as actionTypes from "./actionTypes";

//===============================================================================================================//

// Generic Label Action Creators

export const labelStartLoading = () => {
  return {
    type: actionTypes.LABEL_START_LOADING
  };
};

export const labelReturnFailure = error => {
  return {
    type: actionTypes.LABEL_RETURN_FAILURE,
    error: error
  };
};

export const labelResetStatus = () => {
  return {
    type: actionTypes.LABEL_RESET_STATUS
  };
};

//===============================================================================================================//

// Action Creators for retreiving Labels from database

export const fetchLabelsSuccess = labels => {
  return {
    type: actionTypes.FETCH_LABELS_SUCCESS,
    labels: labels
  };
};

export const fetchLabelsSend = () => {
  return {
    type: actionTypes.FETCH_LABELS_SEND
  };
};

//===============================================================================================================//

// Action Creators for retreiving single Label from database

export const fetchLabelSuccess = label => {
  return {
    type: actionTypes.FETCH_LABEL_SUCCESS,
    label: label
  };
};

export const fetchLabelSend = (labelId, edit) => {
  return {
    type: actionTypes.FETCH_LABEL_SEND,
    id: labelId,
    edit: edit
  };
};

//===============================================================================================================//

// Action Creators for adding single Label from database

export const addLabelClientPrep = () => {
  return {
    type: actionTypes.ADD_LABEL_CLIENT_PREP
  };
};

export const addLabelSuccess = success => {
  return {
    type: actionTypes.ADD_LABEL_SUCCESS,
    success: success
  };
};

export const addLabelSend = (labelData, fileFlag) => {
  return {
    type: actionTypes.ADD_LABEL_SEND,
    label: labelData,
    file: fileFlag
  };
};

//===============================================================================================================//

// Action Creators for editing Label data client side

export const editLabelClientPrep = label => {
  return {
    type: actionTypes.EDIT_LABEL_CLIENT_PREP,
    label: label
  };
};

export const editLabelClientInput = updatedObject => {
  return {
    type: actionTypes.EDIT_LABEL_CLIENT_INPUT,
    updatedObject: updatedObject
  };
};

//===============================================================================================================//

// Action Creators for updating single Label on database

export const updateLabelSuccess = success => {
  return {
    type: actionTypes.UPDATE_LABEL_SUCCESS,
    success: success
  };
};

export const updateLabelSend = (labelId, labelData, fileFlag) => {
  return {
    type: actionTypes.UPDATE_LABEL_SEND,
    id: labelId,
    label: labelData,
    file: fileFlag
  };
};

//===============================================================================================================//

// Action Creators for deleting a single Label from database

export const deleteLabelSuccess = success => {
  return {
    type: actionTypes.DELETE_LABEL_SUCCESS,
    success: success
  };
};

export const deleteLabelSend = labelId => {
  return {
    type: actionTypes.DELETE_LABEL_SEND,
    id: labelId
  };
};

//===============================================================================================================//
