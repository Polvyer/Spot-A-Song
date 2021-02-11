/* Miscellaneous */
const SEC_TO_MS = 1000;
const TWO_MINUTE_DELAY_IN_MS = 120000;
const MESSAGE_TYPE = 'SPOTIFY';
const DEFAULT_PLAYLIST_NAME = 'New playlist by Spot-A-Song';
const LINKEDIN_LINK = "https://www.linkedin.com/in/wocampo/";
const GITHUB_LINK = "https://github.com/Polvyer";

/* Popup Window */
const POPUP_WIDTH = 400;
const POPUP_HEIGHT = 426;

/* Flask Miscellaneous */
const FLASK_BASE_URL = 'http://localhost:5000';

/* Flask Endpoints */
const FLASK_GET_GENRE_ENDPOINT = FLASK_BASE_URL + '/api/genre';
const FLASK_TOKEN_ENDPOINT = FLASK_BASE_URL + '/api/token';
const FLASK_CREATE_PLAYLIST_ENDPOINT = FLASK_BASE_URL + '/api/playlists';

/* Spotify Miscellaneous */
const SPOTIFY_CLIENT_ID = '6fac3fef5c2c421cad275fb6fd4e0516';
const SPOTIFY_REDIRECT_URI = 'http://localhost:3000';
const GLOBAL_TOP_50_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";

/* Spotify Endpoints */
const SPOTIFY_GET_FEATURED_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/browse/featured-playlists";
const SPOTIFY_SEVERAL_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/tracks';
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";
const SPOTIFY_GET_ARTIST_ENDPOINT = "https://api.spotify.com/v1/artists";
const SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations";
const SPOTIFY_GET_TRACK_AUDIO_FEATURES = "https://api.spotify.com/v1/audio-features";
const SPOTIFY_GET_USER_PROFILE = "https://api.spotify.com/v1/me";

export {
  SEC_TO_MS,
  TWO_MINUTE_DELAY_IN_MS,
  MESSAGE_TYPE,
  FLASK_BASE_URL,
  DEFAULT_PLAYLIST_NAME,
  LINKEDIN_LINK,
  GITHUB_LINK,
  POPUP_WIDTH,
  POPUP_HEIGHT,
  GLOBAL_TOP_50_PLAYLIST_ID,
  FLASK_GET_GENRE_ENDPOINT,
  FLASK_TOKEN_ENDPOINT,
  FLASK_CREATE_PLAYLIST_ENDPOINT,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_GET_FEATURED_PLAYLISTS_ENDPOINT,
  SPOTIFY_SEVERAL_TRACKS_ENDPOINT,
  SPOTIFY_AUTHORIZE_ENDPOINT,
  SPOTIFY_SEARCH_ENDPOINT,
  SPOTIFY_GET_ARTIST_ENDPOINT,
  SPOTIFY_GET_RECOMMENDATIONS_ENDPOINT,
  SPOTIFY_GET_TRACK_AUDIO_FEATURES,
  SPOTIFY_GET_USER_PROFILE,
};