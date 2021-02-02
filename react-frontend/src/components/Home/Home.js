import React, { useState, useMemo } from 'react';
import { useToken } from '../../hooks/useToken';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';
import Errors from '../Errors/Errors'
import { ErrorContext } from '../../context/ErrorContext';

const Home = () => {

  const [ token, setToken, loggedIn, setLoggedIn ] = useToken();
  const [ playlist, setPlaylist ] = useState([]);
  const [ track, setTrack ] = useState('');
  const [ errors, setErrors ] = useState([]);

  // Value only changes if dependency array changes 
  const value = useMemo(() => ({ errors, setErrors }), [errors, setErrors]);

  return (
    <ErrorContext.Provider value={value}>
      { errors.length > 0 ? <Errors errors={errors} setErrors={setErrors} /> : null}
      { playlist.length > 0 ? <Playlist track={track} playlist={playlist} setPlaylist={setPlaylist} /> : <Search track={track} setTrack={setTrack} token={token} setPlaylist={setPlaylist} loggedIn={loggedIn} />}
    </ErrorContext.Provider>
  );
};

export default Home;
