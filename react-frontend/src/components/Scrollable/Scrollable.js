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

const Scrollable = ({ playlist, setPlaylist }) => {

  const [ trackPlaying, setTrackPlaying ] = useState(null);

  const removeTrack = (track_id) => {
    const playlistIds = playlist.map(track => track.id);
    const indexFound = playlistIds.findIndex(id => track_id === id);
    const newPlaylist = [ ...playlist ];
    newPlaylist.splice(indexFound, 1);
    setPlaylist(newPlaylist);
  };

  console.log('New Playlist:', playlist);

  return (
    <Ul>
      {playlist.map(track => <Track key={track.id} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} track={track} removeTrack={removeTrack} />)}
    </Ul>
  );
};

export default Scrollable;