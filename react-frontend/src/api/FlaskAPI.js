/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { FLASK_TOKEN_ENDPOINT, FLASK_CREATE_PLAYLIST_ENDPOINT,
         FLASK_BASE_URL, FLASK_GET_GENRE_ENDPOINT } from '../constants/constants';

// Get a track's predicted genre ('pop', 'rock', 'rap', 'country', 'hip hop', 'latin', 'funk', 'adult standards', 'urban contemporary', 'mellow gold')
const getGenre = (predObj) => {

  const config = {
    data: predObj,
    method: 'POST'
  };

  return axios(FLASK_GET_GENRE_ENDPOINT, config);
};

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
  return axios.get(FLASK_BASE_URL + `/users/${user_id}`);
};

// Get playlist
const getPlaylist = (playlist_id) => {
  return axios.get(FLASK_BASE_URL + `/playlists/${playlist_id}`);
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
    data: `code=${code}&SPOTIFY_REDIRECT_URI=${window.location.href}`,
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
  getGenre: getGenre,
  createPlaylist: createPlaylist,
  getPlaylists: getPlaylists,
  getPlaylist: getPlaylist,
  getToken: getToken,
  getUserToken: getUserToken,
  getRefreshedToken: getRefreshedToken,
};