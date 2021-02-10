import React, { useEffect, useState } from 'react';
import Logo from '../../images/logo.png';
import SpotifyAPI from '../../api/SpotifyAPI';
import FlaskAPI from '../../api/FlaskAPI';
import Dropdown from '../Dropdown/Dropdown';
import { Header, LogoBox, Nav, InputBox, TextBox, HeadingPrimary, Avatar, Body, Toggles, None } from './Styles';
import Deck from '../Deck/Deck';

const User = ({ token, setShowPlaylists, logout, tracks, keywords, handleSearchInputChange, onTrackSelect }) => {

  const [ user, setUser ] = useState(null);
  const [ playlists, setPlaylists ] = useState([]);
  const [ toggleLikes, setToggleLikes ] = useState(false);

  // Get user's playlists
  useEffect(() => {
    SpotifyAPI.getUserProfile(token).then(response => {
      setUser(response.data);
      FlaskAPI.getPlaylists(response.data.id).then(async (response) => {
        const playlists = response.data.playlists;
        const ids = playlists.map(playlist => playlist.track_id);
        try {
          const response = await SpotifyAPI.getSeveralTracks(token, ids);
          playlists.forEach((playlist, index) => playlist.track = response.data.tracks[index]);
          setPlaylists(playlists);
        } catch (err) {
          // TO-DO
        }
      }).catch(err => {
        console.log('Hi');
        // TO-DO
      });
    }).catch(err => {
      // TO-DO
    });
  }, [token]);

  // Split playlists into public and private playlists
  const [ publicPlaylists, privatePlaylists ] = playlists.reduce((accum, playlist) => {
    if (playlist.status === 'public') {
      accum[0].push(playlist)
    } else {
      accum[1].push(playlist);
    }
    return accum;
  }, [[], []]);

  const renderContent = () => {
    if (toggleLikes) {
      return <None>You don't have likes</None>
    } else {
      return (
        <>
          <h3 style={{"marginTop": "20px"}}>Public Playlists</h3>
          {publicPlaylists.length > 0 ? <Deck playlists={publicPlaylists} /> : <None>You don't have any public playlists saved</None>}
          <h3>Private Playlists</h3>
          {privatePlaylists.length > 0 ? <Deck playlists={privatePlaylists} /> : <None>You don't have any private playlists saved</None>}
        </>
      );
    }
  };
  
  return (
    <>
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
      <Body>
        <Toggles>
          <div onClick={() => setToggleLikes(false)} className={toggleLikes ? "toggle1 toggle" : "toggle1 toggle toggled"}>My Playlists</div>
          <div onClick={() => setToggleLikes(true)} className={toggleLikes ? "toggle2 toggle toggled" : "toggle2 toggle"}>My Likes</div>
        </Toggles>
        { renderContent() }
      </Body>
    </>
  );
};

export default User;