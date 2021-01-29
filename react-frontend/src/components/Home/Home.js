import React, { useState } from 'react';
import { useToken } from '../../hooks/useToken';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';

const Home = () => {

  const [ token, setToken ] = useToken();
  const [ playlist, setPlaylist ] = useState([]);
  const [ track, setTrack ] = useState('');

  return (
    <>
      { playlist.length > 0 ? <Playlist track={track} playlist={playlist} setPlaylist={setPlaylist} /> : <Search track={track} setTrack={setTrack} token={token} setPlaylist={setPlaylist} />}
    </>
  );
};

export default Home;
