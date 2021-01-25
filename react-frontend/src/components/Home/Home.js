import React, { useState, useRef } from 'react';
import { useToken } from '../../hooks/useToken';
import { Header, LogoBox, TextBox, HeadingPrimary } from './Styles';
import Logo from '../../images/logo.png';
import SpotifyAPI from '../../api/SpotifyAPI';
import Dropdown from '../Dropdown/Dropdown';

const Home = () => { 
  
  const [ tracks, setTracks ] = useState([]);
  const [ token, setToken ] = useToken();
  const [ keywords, setKeyWords ] = useState('');

  const handleChange = async (e) => {
    setKeyWords(e.target.value);
    try {
      const response = await SpotifyAPI.searchTrack(token, e.target.value);
      console.log(response);
      setTracks(response.data.tracks.items);
    } catch (err) {
      if (err.response.data) {
        console.log(err.response);
        if (err.response.status === 400) {
          setTracks([]);
        }
        if (err.response.status === 401) {
          // Invalid token
        }
      }
    }
  }

  return (
    <Header>
      <LogoBox>
        <img src={Logo} alt="logo" className="logo" />
      </LogoBox>
      <TextBox className="text-box">
        <HeadingPrimary className="heading-primary">
          <span className="heading-primary-main">Live with music</span>
          <span className="heading-primary-sub">Make the playlist of your dreams based on a song.</span>
        </HeadingPrimary>
        <Dropdown tracks={tracks} keywords={keywords} handleChange={handleChange} />
      </TextBox>
    </Header>
  )
}

export default Home;
