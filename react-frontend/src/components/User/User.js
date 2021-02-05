import React, { useEffect, useState } from 'react';
import Logo from '../../images/logo.png';
import SpotifyAPI from '../../api/SpotifyAPI';
import FlaskAPI from '../../api/FlaskAPI';
import Dropdown from '../Dropdown/Dropdown';
import { Header, LogoBox, Nav, InputBox, TextBox, HeadingPrimary, Avatar } from './Styles';

const User = ({ token, setShowPlaylists, logout, tracks, keywords, handleSearchInputChange, onTrackSelect }) => {

  const [ user, setUser ] = useState(null);
  const [ playlists, setPlaylists ] = useState([]);

  // Get user's playlists
  useEffect(() => {
    SpotifyAPI.getUserProfile(token).then(response => {
      setUser(response.data);
      FlaskAPI.getPlaylists(response.data.id).then(response => {
        setPlaylists(response.data.playlists);
        console.log(response.data.playlists);
      })
    });
  }, [token]);
  
  return (
    <Header>
      <LogoBox>
        <img onClick={setShowPlaylists.bind(null, false)} src={Logo} alt="logo" className="logo" />
      </LogoBox>
      <InputBox>
        <Dropdown tracks={tracks} keywords={keywords} handleSearchInputChange={handleSearchInputChange} onTrackSelect={onTrackSelect} />
      </InputBox>
      <Nav><span onClick={setShowPlaylists.bind(null, true)} className="nav-items">My Playlists</span><span onClick={logout} className="nav-items">Logout</span></Nav>
      <TextBox>
        <HeadingPrimary className="heading-primary">
          <span className="heading-primary-main">{user && user.display_name}</span>
        </HeadingPrimary>
      </TextBox>
      <Avatar>
        <img className="avatar" src={user && user.images[0].url} alt="Avatar" />
      </Avatar>
    </Header>
  );
};

export default User;