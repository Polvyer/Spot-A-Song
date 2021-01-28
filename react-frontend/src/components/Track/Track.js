import React, { useState, useRef, useEffect } from 'react';
import { Li } from './Styles';
import { CircleAudioPlayer } from '../../CircleAudioPlayer';

const Track = ({ track, index, trackPlaying, setTrackPlaying }) => {

  // Instantiate new player
  const [ player, setPlayer ] = useState(track.preview_url ? new CircleAudioPlayer({
    audio: track.preview_url || '',
    size: 30,
    borderWidth: 4,
    borderColor: "#257bba",
	  playedColor: "#ffffff",
	  backgroundColor: "#257bba",
	  iconColor: "#ffffff",
  }, setTrackPlaying, track.id) : null);

  // Reference to list item
  const liRef = useRef();

  // Append player to list item
  useEffect(() => {
    if (player) {
      player.appendTo(liRef.current);
    }

  }, [player]);

  // Pause player when another track is playing
  useEffect(() => {
    if (trackPlaying && player && (trackPlaying !== track.id)) {
      player.pause();
    }
  }, [trackPlaying, player, track]);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Li ref={liRef} onDrop={e => handleDrop(e)} onDragOver={e => handleDragOver(e)} onDragEnter={e => handleDragEnter(e)} onDragLeave={e => handleDragLeave(e)}>
      {track.name}, {track.artists[0].name}
    </Li>
  );
};

export default Track;