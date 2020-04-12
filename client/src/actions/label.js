import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ALL_LABELS,
  GET_CURRENT_USER_LABELS,
  LABEL_ERROR,
  DELETE_LABEL,
  ADD_LABEL,
  GET_LABEL,
  UPDATE_LABEL_RELEASES,
  REMOVE_LABEL_RELEASE
} from './types';

// Get all labels
export const getAllLabels = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/labels/all');

    dispatch({
      type: GET_ALL_LABELS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LABEL_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Get current user labels
export const getCurrentUserLabels = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/labels');

    dispatch({
      type: GET_CURRENT_USER_LABELS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LABEL_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Delete label
export const deleteLabel = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/labels/${id}`);

    dispatch({
      type: DELETE_LABEL,
      payload: id
    });

    dispatch(setAlert('Label Removed'));
  } catch (err) {
    dispatch({
      type: LABEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add label
export const addLabel = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/labels', formData, config);

    dispatch({
      type: ADD_LABEL,
      payload: res.data
    });

    dispatch(setAlert('Label Created'));
  } catch (err) {
    dispatch({
      type: LABEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get label
export const getLabel = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/labels/${id}`);

    dispatch({
      type: GET_LABEL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LABEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update label releases
export const updateLabelReleases = (labelId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/labels/releases/${labelId}`, config);

    if (res.data.msg === 'No new label releases') {
      dispatch(setAlert('No New Label Releases'));
    } else {
      dispatch({
        type: UPDATE_LABEL_RELEASES,
        payload: res.data
      });

      dispatch(setAlert('Label Releases Updated'));
    }
  } catch (err) {
    dispatch({
      type: LABEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete label release
export const deleteLabelRelease = (labelId, releaseId) => async (dispatch) => {
  try {
    await axios.delete(`/api/labels/release/${labelId}/${releaseId}`);

    dispatch({
      type: REMOVE_LABEL_RELEASE,
      payload: releaseId
    });

    dispatch(setAlert('Label Release Removed'));
  } catch (err) {
    dispatch({
      type: LABEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
