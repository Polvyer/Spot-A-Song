import React from 'react';
import { Container, Cover } from './Styles';
import Scrollable from '../Scrollable/Scrollable';
import Close from '../../images/x.svg';

const Player = ({ track, playlist, setPlaylist }) => {

  return (
    <Container>
      <Cover background={track.album.images[0].url}>
        <img src={Close} alt="Close" className="close" />
        <div className="cover-gradient"></div>
        <span className="track-name">{track.name}, {track.artists[0].name}</span>
      </Cover>
      <Scrollable track={track} playlist={playlist} />
    </Container>
  );
};

export default Player;