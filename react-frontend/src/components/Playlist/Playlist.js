import React, { useEffect, useState } from 'react';
import Player from '../Player/Player';
import Information from '../Information/Information';
import styled from 'styled-components';
import Icons from '../Icons/Icons';
import Modal from '../Modal/Modal';
import LoaderModal from '../LoaderModal/LoaderModal';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Playlist = ({ showIcons, setShowIcons, token, track, playlist, setPlaylist, loggedIn, connectWithSpotify, setShowPlaylists }) => {

  const [ showModal, setShowModal ] = useState(false);
  const [ playlistInfo, setPlaylistInfo ] = useState({ url: '', uri: ''});
  const [ showLoader, setShowLoader ] = useState(false);

  // Component unmount
  useEffect(() => {
    return () => {
      setShowIcons(false);
    }
  }, [setShowIcons]);

  const openInNewTab = (url) => {
    const win = window.open(url, '_blank');
    win.focus();
  };

  return (
    <Container>
      {showLoader ? <LoaderModal /> : null}
      {showModal ? <Modal openInNewTab={openInNewTab} playlistInfo={playlistInfo} hideModal={setShowModal.bind(null, false)} albumCover={track.album.images[0].url} /> : null}
      <Player track={track} playlist={playlist} setPlaylist={setPlaylist} />
      {!showIcons ? <Information setShowLoader={setShowLoader} track={track} setPlaylistInfo={setPlaylistInfo} setShowModal={setShowModal} setShowIcons={setShowIcons} playlist={playlist} token={token} loggedIn={loggedIn} connectWithSpotify={connectWithSpotify} /> : <Icons openInNewTab={openInNewTab} playlistInfo={playlistInfo} setShowIcons={setShowIcons} setShowPlaylists={setShowPlaylists} setPlaylist={setPlaylist} />}
    </Container>
  );
};

export default Playlist;