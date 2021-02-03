import React from 'react';
import Player from '../Player/Player';
import Information from '../Information/Information';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Playlist = ({ token, track, playlist, setPlaylist, loggedIn, connectWithSpotify }) => {

  return (
    <Container>
      <Player track={track} playlist={playlist} setPlaylist={setPlaylist} />
      <Information playlist={playlist} track={track} token={token} loggedIn={loggedIn} connectWithSpotify={connectWithSpotify} />
    </Container>
  );
};

export default Playlist;