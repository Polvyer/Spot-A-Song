import React from 'react';
import { Header, Login, Nav, LogoBox, TextBox, HeadingPrimary } from './Styles';
import Dropdown from '../Dropdown/Dropdown';
import Logo from '../../images/logo.png';
import Spotify from '../../images/spotify.png';

const Search = ({ loggedIn, connectWithSpotify, setShowPlaylists, logout, tracks, keywords, handleSearchInputChange, onTrackSelect }) => {

  return (
    <Header>
      <LogoBox>
        <img src={Logo} alt="logo" className="logo" />
      </LogoBox>
      {loggedIn ? <Nav><span onClick={setShowPlaylists.bind(null, true)} className="nav-items">My Playlists</span><span onClick={logout} className="nav-items">Logout</span></Nav> : <Login onClick={connectWithSpotify}><img className="spotify-logo" alt="Spotify" src={Spotify} /><span>Connect with Spotify</span></Login>}
      <TextBox className="text-box">
        <HeadingPrimary className="heading-primary">
          <span className="heading-primary-main">Live with music</span>
          <span className="heading-primary-sub">Make the playlist of your dreams based on a song.</span>
        </HeadingPrimary>
        <Dropdown tracks={tracks} keywords={keywords} handleSearchInputChange={handleSearchInputChange} onTrackSelect={onTrackSelect} />
      </TextBox>
    </Header>
  );
};

export default Search;