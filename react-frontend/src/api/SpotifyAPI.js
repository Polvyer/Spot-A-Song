/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_AUTHORIZE_ENDPOINT, SPOTIFY_SEARCH_ENDPOINT, SPOTIFY_GET_ARTIST_ENDPOINT, SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT, SPOTIFY_GET_TRACK_AUDIO_FEATURES, SPOTIFY_GET_USER_PROFILE, SPOTIFY_SEVERAL_TRACKS_ENDPOINT } from '../constants/constants';

// Have your application request authorization
const getAuthorizationURL = () => {

  // Query Parameters
  const client_id = SPOTIFY_CLIENT_ID;
  const response_type = 'code'; // Authorization Code Flow
  const redirect_uri = SPOTIFY_REDIRECT_URI; // The URI to redirect to after the user grants or denies permission
  const scope = ['playlist-modify-public', 'playlist-modify-private', 'user-read-email']; // Permissions
  const show_dialog = 'true'; // Whether or not to force the user to approve the app again if they’ve already done so
  const params = `client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope.join('%20')}&show_dialog=${show_dialog}`;

  const url = `${SPOTIFY_AUTHORIZE_ENDPOINT}?${params}`;

  return url;
};

// Get Spotify Catalog information about tracks that match a keyword string
const searchTrack = (token, keywords) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  // Query Parameters
  const q = keywords.split(' ').join('%20');
  const type = 'track';
  const limit = 5; // Dropdown list of 5 tracks
  const params = `q=${q}&type=${type}&limit=${limit}`;

  const url = `${SPOTIFY_SEARCH_ENDPOINT}?${params}`;

  return axios(url, config);
};

// Get Spotify catalog information for a single artist identified by their unique Spotify ID
const getArtist = (token, artist_id) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  const url = `${SPOTIFY_GET_ARTIST_ENDPOINT}/${artist_id}`;

  return axios(url, config);
};

// Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks
const getRecommendations = (token, track_id, artist_id, genres) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  // Query Parameters
  const limit = 100;
  const seed_genres = genres.join('%2C');
  const params = `limit=${limit}&seed_artists=${artist_id}&seed_genres=${seed_genres}&seed_tracks=${track_id}`;

  const url = `${SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT}?${params}`;

  return axios(url, config);
};

// Get detailed profile information about the current user
const getUserProfile = (token) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  return axios(SPOTIFY_GET_USER_PROFILE, config);
};

// Create a playlist for a Spotify user
const createPlaylist = (token, user_id, name, publi) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: 'POST',
    data: {
      name,
      public: publi
    }
  };

  return axios(`https://api.spotify.com/v1/users/${user_id}/playlists`, config);
};

// Add one or more items to a user’s playlist
const addToPlaylist = (token, playlist_id, listOfUris) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: {
      "uris": listOfUris,
    }
  };

  return axios(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, config);
};

// Get Spotify catalog information about artists similar to a given artist
const getRelatedArtists = (token, artist_id) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };

  return axios(`https://api.spotify.com/v1/artists/${artist_id}/related-artists`, config);
};

// Get Spotify catalog information about an artist’s top tracks by country
const getArtistsTopTracks = (token, artist_id) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };

  const market = 'US';

  return axios(`https://api.spotify.com/v1/artists/${artist_id}/top-tracks?market=${market}`, config);
};

// Get Spotify catalog information for multiple tracks based on their Spotify IDs
const getSeveralTracks = (token, lstOfIds) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  };

  // Query Parameters
  const ids = lstOfIds.join(',');
  const params = `ids=${ids}`;

  const url = `${SPOTIFY_SEVERAL_TRACKS_ENDPOINT}?${params}`;

  return axios(url, config);
};

const getTrackAudioFeatures = (token) => {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  };

  const url = SPOTIFY_GET_TRACK_AUDIO_FEATURES;

  return axios(url, config);

};

export default {
  getAuthorizationURL: getAuthorizationURL,
  searchTrack: searchTrack,
  getRelatedArtists: getRelatedArtists,
  getArtist: getArtist,
  getSeveralTracks: getSeveralTracks,
  getArtistsTopTracks: getArtistsTopTracks,
  getUserProfile: getUserProfile,
  createPlaylist: createPlaylist,
  addToPlaylist: addToPlaylist,
  getRecommendations: getRecommendations,
  getTrackAudioFeatures: getTrackAudioFeatures,
}