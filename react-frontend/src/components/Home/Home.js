import React, { useState, useMemo, useEffect } from 'react';
import { useToken } from '../../hooks/useToken';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';
import Errors from '../Errors/Errors'
import { ErrorContext } from '../../context/ErrorContext';
import { MESSAGE_TYPE } from '../../constants/constants';

const Home = () => {

  const [ errors, setErrors ] = useState([]);
  const [ token, setToken, loggedIn ] = useToken(errors, setErrors);
  const [ playlist, setPlaylist ] = useState([]);
  const [ track, setTrack ] = useState('');

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

  // Value only changes if dependency array changes 
  const value = useMemo(() => ({ errors, setErrors }), [errors, setErrors]);

  return (
    <ErrorContext.Provider value={value}>
      { errors.length > 0 ? <Errors errors={errors} setErrors={setErrors} /> : null}
      { playlist.length > 0 ? <Playlist track={track} playlist={playlist} setPlaylist={setPlaylist} /> : <Search track={track} setTrack={setTrack} token={token} setToken={setToken} setPlaylist={setPlaylist} loggedIn={loggedIn} />}
    </ErrorContext.Provider>
  );
};

export default Home;
