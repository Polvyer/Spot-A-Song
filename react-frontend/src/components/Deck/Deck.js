import React from 'react';
import Card from '../Card/Card';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  align-items: center;

  @media screen and (max-width: 643px) {
    justify-content: center;
  }
`;

const Deck = ({ playlists, onTrackClick }) => {
  return (
    <Container>
      {playlists.map((playlist) => <Card onTrackClick={onTrackClick} key={playlist.playlist_id} playlist={playlist} />)}
    </Container>
  );
};

export default Deck;