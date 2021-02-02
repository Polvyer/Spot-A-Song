import styled from 'styled-components';

const Deck = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: fit-content;
  z-index: 1;
  left: 50%;
`

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: .75rem 1.25rem;
  transform: translate(-50%, 0);
  background-color: #f8d7da;
  border: 1px solid transparent;
  border-color: #f5c6cb;
  border-radius: .25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .error {
    color: #721c24;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
  }

  .close {
    cursor: pointer;
    width: 1.8rem;
    filter: invert(33%) sepia(15%) saturate(2397%) hue-rotate(314deg) brightness(100%) contrast(40%);
  }
`;

export {
  Deck,
  Container,
};