/* Miscellaneous */
const SEC_TO_MS = 1000;
const TWO_MINUTE_DELAY_IN_MS = 120000;

/* Flask Miscellaneous */
const FLASK_BASE_URL = 'http://localhost:5000';

/* Flask Endpoints */
const FLASK_TOKEN_ENDPOINT = FLASK_BASE_URL + '/api/token';

/* Spotify Miscellaneous */
const SPOTIFY_CLIENT_ID = '6fac3fef5c2c421cad275fb6fd4e0516';
const SPOTIFY_REDIRECT_URI = 'http://localhost:3000';

/* Spotify Endpoints */
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";
const SPOTIFY_GET_ARTIST_ENDPOINT = "https://api.spotify.com/v1/artists";
const SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations";
const SPOTIFY_GET_TRACK_AUDIO_FEATURES = "https://api.spotify.com/v1/audio-features";

export {
  SEC_TO_MS,
  TWO_MINUTE_DELAY_IN_MS,
  FLASK_TOKEN_ENDPOINT,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_AUTHORIZE_ENDPOINT,
  SPOTIFY_SEARCH_ENDPOINT,
  SPOTIFY_GET_ARTIST_ENDPOINT,
  SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT,
  SPOTIFY_GET_TRACK_AUDIO_FEATURES,
};