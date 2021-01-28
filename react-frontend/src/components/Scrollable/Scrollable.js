import React, { useState } from 'react';
import Track from '../Track/Track';
import styled from 'styled-components';

const Ul = styled.ul`
  overflow: hidden;
  overflow-y: scroll;
  height: 60vh;
  width: 100%;
  padding: 0 20px;

  @media screen and (max-width: 1029px) {
    overflow: hidden;
    overflow-y: visibile;
    height: auto;
  }
`;

const Scrollable = ({ track, playlist }) => {

  const [ trackPlaying, setTrackPlaying ] = useState(null);

  return (
    <Ul>
      <Track trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} track={track} />
      {playlist.map(track => <Track key={track.id} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} track={track} />)}
    </Ul>
  );
};

export default Scrollable;