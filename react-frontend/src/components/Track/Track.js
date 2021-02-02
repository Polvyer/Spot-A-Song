import React, { useState, useRef, useEffect } from 'react';
import { Li, Text, Drag, Icons } from './Styles';
import Trash from '../../images/trash.svg';
import List from '../../images/list.svg';
import Circle from '../Circle/Circle';
import '../Circle/Styles.css';
import ReactPlayer from 'react-player';

const Track = ({ track, trackPlaying, setTrackPlaying, removeTrack, handleDragStart, handleDragEnter, handleDrop, draggable, setDraggable, dataTransfer, handleDragOver, handleDragEnd }) => {

  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });

  // Pause player when another track is playing (or when component is unmounted)
  useEffect(() => {
    return (() => {
      if (player && (trackPlaying === track.id)) {
        setPlaying(false);
      }
    });
  }, [player, track.id, trackPlaying, track]);

  const handleTogglePlaying = (track_id) => {
    if (playing) { // Track is playing => pause
      setTrackPlaying(null);
    } else { // Track is not playing => play
      setTrackPlaying(track_id);
    }
    setPlaying(!playing)
  }

  const onSeek = amount => {
    if (player.current) {
      player.current.seekTo(amount, 'fraction');
    }
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Li className={dataTransfer === track.id ? "hidden" : "visible"} draggable={draggable} onDragEnd={handleDragEnd.bind(null)} onDragStart={handleDragStart.bind(null, track.id)} onDrop={handleDrop.bind(null, track.id)} onDragEnter={handleDragEnter.bind(null, track.id)} onDragLeave={handleDragLeave.bind(null)} onDragOver={handleDragOver.bind(null)}>
      <Text>
        <Drag onMouseDown={setDraggable.bind(null, true)} onMouseUp={setDraggable.bind(null, false)} background={List} className="drag"></Drag>
        <span>{track.name}, {track.artists[0].name}</span>
      </Text>
      <Icons>
        <div className="circle-audio-player">
          <ReactPlayer
            ref={player}
            url={track.preview_url}
            playing={playing}
            volume={0.1}
            height="0"
            width="0"
            onProgress={setPlayerState}
            onEnded={() => setPlaying(false)}
          />
          <Circle
            color={track.preview_url ? '#257bba' : '#88899f'}
            iconColor='white'
            size='56'
            played={playerState.played}
            loaded={playerState.loaded}
            playing={playing}
            onSeek={onSeek}
            onTogglePlaying={track.preview_url ? handleTogglePlaying.bind(null, track.id) : console.log.bind(null, '')}
          />
        </div>
        <img onClick={removeTrack.bind(null, track.id)} className='trash' src={Trash} alt="Trash" />
      </Icons>
    </Li>
  );
};

export default Track;