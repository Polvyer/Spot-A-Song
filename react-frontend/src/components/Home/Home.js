import React, { useState, useMemo, useEffect } from 'react';
import { useToken } from '../../hooks/useToken';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';
import Errors from '../Errors/Errors'
import { ErrorContext } from '../../context/ErrorContext';
import { MESSAGE_TYPE, POPUP_WIDTH, POPUP_HEIGHT } from '../../constants/constants';
import { storeTokenInfo } from '../../helpers/storeTokenInfo';
import { authenticationErrorHandler } from '../../helpers/authenticationErrorHandler';
import FlaskAPI from '../../api/FlaskAPI';
import SpotifyAPI from '../../api/SpotifyAPI';

const Home = () => {

  const [ errors, setErrors ] = useState([]);
  const [ token, setToken, loggedIn ] = useToken(errors, setErrors);
  const [ playlist, setPlaylist ] = useState([]);
  const [ track, setTrack ] = useState('');

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

  // Value only changes if dependency array changes 
  const value = useMemo(() => ({ errors, setErrors }), [errors, setErrors]);

  return (
    <ErrorContext.Provider value={value}>
      { errors.length > 0 ? <Errors errors={errors} setErrors={setErrors} /> : null}
      { playlist.length > 0 ? <Playlist token={token} loggedIn={loggedIn} track={track} playlist={playlist} setPlaylist={setPlaylist} connectWithSpotify={connectWithSpotify} /> : <Search track={track} setTrack={setTrack} token={token} setToken={setToken} setPlaylist={setPlaylist} loggedIn={loggedIn} connectWithSpotify={connectWithSpotify} />}
    </ErrorContext.Provider>
  );
};

export default Home;
