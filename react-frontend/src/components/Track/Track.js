import React, { useState, useRef, useEffect } from 'react';
import { Li, Icons } from './Styles';
import { CircleAudioPlayer } from '../../CircleAudioPlayer';
import Trash from '../../images/trash.svg';

const Track = ({ track, trackPlaying, setTrackPlaying, removeTrack }) => {

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

  // Pause player when another track is playing (+ pause when playlist is closed)
  useEffect(() => {
    return (() => {
      if (player && (trackPlaying === track.id)) {
        player.pause();
      }
    });
  }, [player, track.id, trackPlaying, track]);

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
    <Li onDrop={e => handleDrop(e)} onDragOver={e => handleDragOver(e)} onDragEnter={e => handleDragEnter(e)} onDragLeave={e => handleDragLeave(e)}>
      {track.name}, {track.artists[0].name}
      <Icons>
        <div ref={liRef}>
        </div>
        <img onClick={removeTrack.bind(null, track.id)} className='trash' src={Trash} alt="Trash" />
      </Icons>
    </Li>
  );
};

export default Track;