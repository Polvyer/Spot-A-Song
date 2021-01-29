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

  .hidden {
    color: white;
    background-color: white;

    :hover {
      background-color: #73c9b9;
    }
  }
`;

const Scrollable = ({ playlist, setPlaylist }) => {

  const [ trackPlaying, setTrackPlaying ] = useState(null);
  const [ draggable, setDraggable ] = useState(false);
  const [ dataTransfer, setDataTransfer ] = useState(null);

  const removeTrack = (track_id) => {
    const playlistIds = playlist.map(track => track.id);
    const indexFound = playlistIds.findIndex(id => track_id === id);
    const newPlaylist = [ ...playlist ];
    newPlaylist.splice(indexFound, 1);
    setPlaylist(newPlaylist);
  };

  const handleDragStart = (track_id, e) => {
    e.dataTransfer.setData("id", track_id);
    setDataTransfer(track_id);
  };

  const handleDragEnter = (track_id, e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "link";
    const playlistIds = playlist.map(track => track.id);
    const firstIndexFound = playlistIds.findIndex(id => id === track_id);
    const secondIndexFound = playlistIds.findIndex(id => id === dataTransfer);
    const newPlaylist = [ ...playlist ];
    const trackHolder = newPlaylist[secondIndexFound];
    newPlaylist.splice(secondIndexFound, 1);
    newPlaylist.splice(firstIndexFound, 0, trackHolder);
    setPlaylist(newPlaylist);
  };

  const handleDrop = (track_id, e) => {
    e.preventDefault();
    const playlistIds = playlist.map(track => track.id);
    const firstIndexFound = playlistIds.findIndex(id => id === track_id);
    const secondIndexFound = playlistIds.findIndex(id => id === e.dataTransfer.getData("id"));
    const newPlaylist = [ ...playlist ];
    const trackHolder = newPlaylist[secondIndexFound];
    newPlaylist.splice(secondIndexFound, 1);
    newPlaylist.splice(firstIndexFound, 0, trackHolder);
    setPlaylist(newPlaylist);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "link";
    e.stopPropagation();
  };

  const handleDragEnd = e => {
    setDraggable(false);
    setDataTransfer(null);
  };

  return (
    <Ul>
      {playlist.map(track => <Track key={track.id} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} track={track} removeTrack={removeTrack} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDrop={handleDrop} draggable={draggable} setDraggable={setDraggable} dataTransfer={dataTransfer} handleDragOver={handleDragOver} handleDragEnd={handleDragEnd} />)}
    </Ul>
  );
};

export default Scrollable;