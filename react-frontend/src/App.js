import React, { useState, useMemo, useEffect } from 'react';
import { useToken } from './hooks/useToken';
import Search from './components/Search/Search';
import Playlist from './components/Playlist/Playlist';
import Errors from './components/Errors/Errors'
import { ErrorContext } from './context/ErrorContext';
import { MESSAGE_TYPE, POPUP_WIDTH, POPUP_HEIGHT } from './constants/constants';
import { storeTokenInfo } from './helpers/storeTokenInfo';
import { authenticationErrorHandler } from './helpers/authenticationErrorHandler';
import FlaskAPI from './api/FlaskAPI';
import SpotifyAPI from './api/SpotifyAPI';
import Other from './components/Other/Other';
import User from './components/User/User';
import { regularErrorHandler } from './helpers/regularErrorHandler';

const App = () => {

  const [ errors, setErrors ] = useState([]);
  const [ token, setToken, loggedIn ] = useToken(errors, setErrors);
  const [ playlist, setPlaylist ] = useState([]);
  const [ track, setTrack ] = useState('');
  const [ showPlaylists, setShowPlaylists ] = useState(false);
  const [ tracks, setTracks ] = useState([]);
  const [ keywords, setKeyWords ] = useState('');
  const [ windowOpened, setWindowOpened ] = useState(false);

  // Listen for dispatched messages (from popup window)
  useEffect(() => {

    if (windowOpened) {

      const getUserAccessToken = async (code) => {
        try {
          const response = await FlaskAPI.getUserToken(code.toString());
          storeTokenInfo(response.data);
          setToken(null);
        } catch (err) {
          authenticationErrorHandler(err, setErrors, errors);
        }
      };

      const windowEventHandler = (e) => {

        const hash = e.data; // Extract payload

        if (hash && (hash.type === MESSAGE_TYPE)) {

          setWindowOpened(false);

          if (hash.code) {
            const code = hash.code; // Extract code
            getUserAccessToken(code);
          }
        }
      };

      window.addEventListener('message', windowEventHandler, false);

      return () => {
        window.removeEventListener('message', windowEventHandler);
      };
    }
  }, [windowOpened, setWindowOpened, setToken, token, errors, setErrors]);

  // Popup window effect
  useEffect(() => {

    if (window.opener) { // Only runs on popup window

      // Extract 'code' from query
      const query = new URLSearchParams(window.location.search);
      const code = query.get('code'); // null if user declined

      // Post a message back to the window that opened it
      window.opener.postMessage({ type: MESSAGE_TYPE, code }, window.location.origin);

      // Close popup window
      window.close();
    }
  }, []);

  // Redirects user to Spotify authorization page (via popup)
  const connectWithSpotify = () => {
    const url = SpotifyAPI.getAuthorizationURL();
    const LEFT = window.screen.width / 2 - POPUP_WIDTH / 2;
    const TOP = window.screen.height / 2 - POPUP_HEIGHT / 2;

    // To spawn a new window and then reference it
    const popupWindow = window.open(
      url,
      "Spotify Login",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        POPUP_WIDTH +
        ", height=" +
        POPUP_HEIGHT +
        ", top=" +
        TOP +
        ", left=" +
        LEFT
    );

    if (popupWindow) popupWindow.opener = window; // To reference the window that spawned this one

    setWindowOpened(true);
  };

  // Reacts to user's input
  const handleSearchInputChange = async (e) => {

    // Change search input
    const searchInput = e.target.value;
    setKeyWords(searchInput);

    // Search for a list of tracks
    if (searchInput) {
      try {
        const response = await SpotifyAPI.searchTrack(token, searchInput);
        setTracks(response.data.tracks.items);
      } catch (err) {
        regularErrorHandler(err, setTracks, setErrors, errors);
      }
    } else {
      setTracks([]);
    }
  };

  // User selects a track from the list of tracks
  const onTrackSelect = async (track) => {

    // Save selected track
    setTrack(track);
    const track_id = track.id; // Extract track id

    // Get genres associated w/ track
    let response;
    const artist_id = track.artists[0].id; // Extract artist id
    try {
      response = await SpotifyAPI.getArtist(token, artist_id);
    } catch (err) {
      regularErrorHandler(err, setTracks, setErrors, errors);
      return;
    }

    // Analyze genres
    const genres = response.data.genres; // Extract genres
    if (genres.length <= 0) { // No genres found
      // TO-DO
    } 

    else { // Genres found
      if (genres.length <= 3) { // Less than 3 genres found
        // Get recommendations
        try {
          response = await SpotifyAPI.getRecommendations(token, track_id, artist_id, genres);
          setPlaylist([track].concat(response.data.tracks));
        } catch (err) {
          regularErrorHandler(err, setTracks, setErrors, errors);
          return;
        }
      } 
      
      else { // More than 3 genres found
        // Get recommendations
        const newGenres = genres.slice(0, 3); // Extract only 3 genres
        try {
          response = await SpotifyAPI.getRecommendations(token, track_id, artist_id, newGenres);
          setPlaylist([track].concat(response.data.tracks));
        } catch (err) {
          regularErrorHandler(err, setTracks, setErrors, errors);
          return;
        }
      }
    }
  };

  // Remove access token from local storage
  const logout = () => { 
    setShowPlaylists(false);
    localStorage.removeItem('tokenInfo');
    setToken(false);
  };

  // Value only changes if dependency array changes 
  const value = useMemo(() => ({ errors, setErrors }), [errors, setErrors]);

  const renderContent = () => {
    if (playlist.length > 0) {
      return <Playlist setShowPlaylists={setShowPlaylists} token={token} loggedIn={loggedIn} track={track} playlist={playlist} setPlaylist={setPlaylist} connectWithSpotify={connectWithSpotify} />
    } else if (showPlaylists) {
      return <User tracks={tracks} keywords={keywords} handleSearchInputChange={handleSearchInputChange} onTrackSelect={onTrackSelect} token={token} logout={logout} setShowPlaylists={setShowPlaylists} />
    } else {
      return (
        <>
          <Search tracks={tracks} keywords={keywords} handleSearchInputChange={handleSearchInputChange} onTrackSelect={onTrackSelect} logout={logout} setShowPlaylists={setShowPlaylists} track={track} setTrack={setTrack} token={token} setToken={setToken} setPlaylist={setPlaylist} loggedIn={loggedIn} connectWithSpotify={connectWithSpotify} />
          <Other />
        </>
      )
    }
  };

  return (
    <ErrorContext.Provider value={value}>
      { errors.length > 0 ? <Errors errors={errors} setErrors={setErrors} /> : null}
      {renderContent()}
    </ErrorContext.Provider>
  );
};

export default App;
