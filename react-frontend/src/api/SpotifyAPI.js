/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { SPOTIFY_TOKEN_ENDPOINT, SPOTIFY_SEARCH_ENDPOINT, SPOTIFY_GET_ARTIST_ENDPOINT, SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT, SPOTIFY_GET_TRACK_AUDIO_FEATURES } from '../constants/constants';

/* The request is sent to the /api/token endpoint of the Accounts service */
const requestAuthorization = () => {

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  };

  return axios(SPOTIFY_TOKEN_ENDPOINT, config);
};

/* Get Spotify Catalog information about tracks that match a keyword string */
const searchTrack = (token, keywords) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  /* Query Parameters */
  const q = keywords.split(' ').join('%20');
  const type = 'track';
  const limit = 5;
  const params = `q=${q}&type=${type}&limit=${limit}`;

  const url = `${SPOTIFY_SEARCH_ENDPOINT}?${params}`;

  return axios(url, config);
};

const getArtist = (token, artist_id) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  const url = `${SPOTIFY_GET_ARTIST_ENDPOINT}/${artist_id}`;

  return axios(url, config);
}

/* Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks */
const getRecommendations = (token, track_id, artist_id, genres) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  /* Query Parameters */
  const limit = 10;
  const seed_genres = genres.join(', ');
  const params = `limit=${limit}&seed_artists=${artist_id}&seed_genres=${seed_genres}&seed_tracks=${track_id}`;

  const url = `${SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT}?${params}`;

  return axios(url, config);
}

const getTrackAudioFeatures = (token) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  const url = SPOTIFY_GET_TRACK_AUDIO_FEATURES;

  return axios(url, config);

}

export default {
  requestAuthorization: requestAuthorization,
  searchTrack: searchTrack,
  getArtist: getArtist,
  getRecommendations: getRecommendations,
  getTrackAudioFeatures: getTrackAudioFeatures,
}