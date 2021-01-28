import React from 'react';
import Player from '../Player/Player';
import Information from '../Information/Information';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Playlist = ({ track, playlist, setPlaylist }) => {

  return (
    <Container>
      <Player track={track} playlist={playlist} setPlaylist={setPlaylist} />
      <Information />
    </Container>
  );
};

export default Playlist;