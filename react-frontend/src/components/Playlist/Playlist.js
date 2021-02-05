import React, { useState } from 'react';
import Player from '../Player/Player';
import Information from '../Information/Information';
import styled from 'styled-components';
import Icons from '../Icons/Icons';
import Modal from '../Modal/Modal';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Playlist = ({ token, track, playlist, setPlaylist, loggedIn, connectWithSpotify, setShowPlaylists }) => {

  const [ showIcons, setShowIcons ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ playlistInfo, setPlaylistInfo ] = useState({ url: '', uri: ''});

  const openInNewTab = (url) => {
    const win = window.open(url, '_blank');
    win.focus();
  };

  return (
    <Container>
      {showModal ? <Modal openInNewTab={openInNewTab} playlistInfo={playlistInfo} hideModal={setShowModal.bind(null, false)} albumCover={track.album.images[0].url} /> : null}
      <Player track={track} playlist={playlist} setPlaylist={setPlaylist} />
      {!showIcons ? <Information track={track} setPlaylistInfo={setPlaylistInfo} setShowModal={setShowModal} setShowIcons={setShowIcons} playlist={playlist} track={track} token={token} loggedIn={loggedIn} connectWithSpotify={connectWithSpotify} /> : <Icons openInNewTab={openInNewTab} playlistInfo={playlistInfo} setShowIcons={setShowIcons} setShowPlaylists={setShowPlaylists} setPlaylist={setPlaylist} />}
    </Container>
  );
};

export default Playlist;