import React from 'react';
import x from '../../images/x.svg';
import { Background, Container, Section, Cover, Buttons } from './Styles';

const Modal = ({ albumCover, hideModal, playlistInfo, openInNewTab }) => {
  
  return (
    <Background>
      <Container>
        <img onClick={hideModal} className="close" src={x} alt="Close" />
        <span className="confirm-cover-text">Congrats! Your playlist is waiting for you.</span>
        <Section>
          <div className="confirm-cover-back top"></div>
          <div className="confirm-cover-back bottom"></div>
          <Cover background={albumCover}>
            <Buttons>
              <button onClick={openInNewTab.bind(null, playlistInfo.url)} className="play">Play on Spotify Web</button>
              <button onClick={openInNewTab.bind(null, playlistInfo.uri)} className="play">Play on Spotify App</button>
            </Buttons>
          </Cover>
        </Section>
      </Container>
    </Background>
  );
};

export default Modal;