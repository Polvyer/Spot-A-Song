import styled from 'styled-components';

const Body = styled.div`
  padding: 40px 40px 40px 40px;

  .mute {
    color: lightgray;
    font-weight: 500;
    cursor: pointer;
  }
`;

const Deck = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: center;
`;

const Card = styled.div`
  margin: 0 20px;
  width: 10em;

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

export {
  Body,
  Deck,
  Card,
}