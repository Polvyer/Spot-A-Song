import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 750px;
  height: 550px;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;

  background-color: white;
  position: relative;
  text-align: center;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close {
    cursor: pointer;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 2.2rem;
    filter: invert(62%) sepia(8%) saturate(600%) hue-rotate(199deg) brightness(100%) contrast(0%);
  }

  .confirm-cover-text {
    color: black;
    line-height: 1.5em;
    font-size: 1.3rem;
    margin-top: 20px;
    font-weight: 400;
  }

  .confirm-cover-back {
    width: 325px;
    height: 10px;
    background-color: #88899f;
    opacity: .5;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    margin: 2px auto;
  }

  .top {
    width: 275px;
  }

  @media screen and (max-width: 375px) {
    width: 100vw;

    .confirm-cover-back {
      width: 75%;
    }

    .top {
      width: 60%;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Cover = styled.div`
  position: relative;
  width: 375px;
  height: 375px;
  margin: 0 auto;
  background-image: ${props => `url(${props.background})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 6px;

  @media screen and (max-width: 375px) {
    width: 90%;
    height: 300px;
  }
`;

const Buttons = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .play {
    border: none;
    border-radius: 20px;
    margin: 10px auto;
    background-color: #fff;
    color: #257bba;
    padding: 13px 20px;
    width: 235px;
    cursor: pointer;
    display: block;
    font-size: 1rem;

    :hover, :active, :focus {
      outline: none;
    }

    :hover {
      background-color: #73c9b9;
      color: white;
    }
  }
`;

export {
  Background,
  Container,
  Section,
  Cover,
  Buttons,
};