import React from 'react';
import Heart from '../../images/suit-heart-fill.svg';
import Play from '../../images/play-fill.svg';
import Arrow from '../../images/arrow-down.svg';
import { Container, Section, Nav, Wrapper, Popover } from './Styles';

const Icons = ({ openInNewTab, playlistInfo, setShowIcons, setShowPlaylists, setPlaylist }) => {

  const goToMyPlaylists = () => {
    setShowPlaylists(true);
    setPlaylist([]);
  };

  return (
    <Container>
      <Section>
        <Nav>
          <Wrapper onClick={openInNewTab.bind(null, playlistInfo.url)}>
            <img className="icon" src={Play} alt="Listen on Spotify" />
            <Popover className="popover__content">
              <p className="popover__message">Listen on Spotify</p>
            </Popover>
          </Wrapper>
          <Wrapper className="likes">
            <img className="icon" src={Heart} alt="Likes" />
            <Popover className="popover__content">
              <p className="popover__message">Likes</p>
            </Popover>
          </Wrapper>
          <Wrapper onClick={setShowIcons.bind(null, false)}>
            <img className="icon" src={Arrow} alt="Save playlist" />
            <Popover className="popover__content">
              <p className="popover__message">Save playlist</p>
            </Popover>
          </Wrapper>
        </Nav>
        <span onClick={goToMyPlaylists} className="my-playlists">Go To My Playlists</span>
      </Section>
    </Container>
  );
};

export default Icons;