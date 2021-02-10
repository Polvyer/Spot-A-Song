import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 20px;

  .album-cover {
    max-width: 100%;
    max-height: 10em;
    display: block;
    cursor: pointer;
    margin: 0 auto;
  }

  .container {
    padding: 2px 16px;
  }
`;

const Card = ({ playlist, onTrackClick }) => {
  return (
    <Container>
      <img onClick={onTrackClick.bind(null, playlist.playlist_id, playlist.track)}className="album-cover" src={playlist.track.album.images[0].url} alt="album-cover" />
      <div className="container">
        <h4><b>{playlist.playlist_name.length > 20 ? playlist.playlist_name.split('').slice(0, 15).join('') + '...' : playlist.playlist_name}</b></h4>
        <p>Created {new Date(playlist.timestamp).toLocaleDateString()}</p>
      </div>
    </Container>
  );
};

export default Card;