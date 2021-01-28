import styled from 'styled-components';

const Container = styled.div`
  flex: 1.4;
  flex-basis: 700px;
`;

const Cover = styled.div`
  position: relative;
  width: 100%;
  height: 256px;
  background-image: ${props => `url(${props.background})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;

  .close {
    cursor: pointer;
    position: absolute;
    top: 15px;
    width: 3em;
    padding-left: 5px;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    left: 0;
    background-color: rgba(0,0,0,0.5);
  }

  .cover-gradient {
    position: absolute;
    width: 100%;
    height: 150px;
    bottom: 0;
    background: linear-gradient(180deg,transparent 0,rgba(0,0,0,.8));
  }

  .track-name {
    position: absolute;
    color: white;
    bottom: 15px;
    left: 20px;
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

export {
  Container,
  Cover,
}