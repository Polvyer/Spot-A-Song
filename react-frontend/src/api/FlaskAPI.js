/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { FLASK_TOKEN_ENDPOINT, FLASK_CREATE_PLAYLIST_ENDPOINT, FLASK_BASE_URL } from '../constants/constants';

// Create playlist
const createPlaylist = (playlist_id, status, user_id, track_id, tracks, playlist_name) => {

  const payload = {
    playlist_id,
    status,
    user_id,
    track_id,
    tracks,
    playlist_name,
  };

  const config = {
    data: payload,
    method: 'POST'
  };

  return axios(FLASK_CREATE_PLAYLIST_ENDPOINT, config);
};

// Get playlists
const getPlaylists = (user_id) => {
  return axios.get(FLASK_BASE_URL + `/api/users/${user_id}`);
};

// Get Spotify access token
const getToken = () => {
  return axios.get(FLASK_TOKEN_ENDPOINT);
};

// Get Spotify access token + User authorization
const getUserToken = (code) => {

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `code=${code}`,
    method: 'POST'
  };

  return axios(FLASK_TOKEN_ENDPOINT, config);
};

// Get Spotify refreshed access token + User authorization
const getRefreshedToken = (refresh_token) => {

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `refresh_token=${refresh_token}`,
    method: 'POST'
  };

  return axios(FLASK_TOKEN_ENDPOINT, config);
};

export default {
  createPlaylist: createPlaylist,
  getPlaylists: getPlaylists,
  getToken: getToken,
  getUserToken: getUserToken,
  getRefreshedToken: getRefreshedToken,
};