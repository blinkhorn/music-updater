import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ALL_ARTISTS,
  GET_CURRENT_USER_ARTISTS,
  ARTIST_ERROR,
  DELETE_ARTIST,
  ADD_ARTIST,
  GET_ARTIST,
  GET_CURRENT_ARTIST,
  UPDATE_CURRENT_ARTIST,
  UPDATE_ARTIST_RELEASES,
  REMOVE_ARTIST_RELEASE
} from './types';

// Get all artists
export const getAllArtists = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/artists/all');

    dispatch({
      type: GET_ALL_ARTISTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ARTIST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Get current user artists
export const getCurrentUserArtists = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/artists');

    dispatch({
      type: GET_CURRENT_USER_ARTISTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ARTIST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Delete artist
export const deleteArtist = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/artists/${id}`);

    dispatch({
      type: DELETE_ARTIST,
      payload: id
    });

    dispatch(setAlert('Artist Removed'));
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add artist
export const addArtist = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/artists', formData, config);

    dispatch({
      type: ADD_ARTIST,
      payload: res.data
    });

    dispatch(setAlert('Artist Created'));
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get artist
export const getArtist = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/artists/${id}`);

    dispatch({
      type: GET_ARTIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update current artist
export const updateCurrentArtist = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/artists/set/${id}`);
    if (res.data.msg !== 'Current artist set') {
      dispatch(setAlert(res.data.msg));
    } else {
      dispatch({
        type: UPDATE_CURRENT_ARTIST,
        payload: res.data
      });
      dispatch(setAlert('Current Artist Updated'));
    }
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current artist
export const getCurrentArtist = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/artists/current`);

    dispatch({
      type: GET_CURRENT_ARTIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update artist releases
export const updateArtistReleases = (artistId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/artists/releases/${artistId}`, config);
    if (res.data.msg === 'No new artist releases') {
      dispatch(setAlert('No New Artist Releases'));
    } else {
      dispatch({
        type: UPDATE_ARTIST_RELEASES,
        payload: res.data
      });

      dispatch(setAlert('Artist Releases Updated'));
    }
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete artist release
export const deleteArtistRelease = (artistId, releaseId) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/artists/release/${artistId}/${releaseId}`);

    dispatch({
      type: REMOVE_ARTIST_RELEASE,
      payload: releaseId
    });

    dispatch(setAlert('Artist Release Removed'));
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
