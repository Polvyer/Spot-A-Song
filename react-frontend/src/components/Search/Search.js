import React, { useState, useContext, useEffect } from 'react';
import { Header, Login, Nav, LogoBox, TextBox, HeadingPrimary } from './Styles';
import Dropdown from '../Dropdown/Dropdown';
import Logo from '../../images/logo.png';
import SpotifyAPI from '../../api/SpotifyAPI';
import Spotify from '../../images/spotify.png';
import { ErrorContext } from '../../context/ErrorContext';
import { regularErrorHandler } from '../../helpers/regularErrorHandler';
import { MESSAGE_TYPE, POPUP_WIDTH, POPUP_HEIGHT } from '../../constants/constants';
import FlaskAPI from '../../api/FlaskAPI';
import { storeTokenInfo } from '../../helpers/storeTokenInfo';
import { authenticationErrorHandler } from '../../helpers/authenticationErrorHandler';

const Search = ({ token, setToken, setPlaylist, setTrack, loggedIn }) => {

  const [ tracks, setTracks ] = useState([]);
  const [ keywords, setKeyWords ] = useState('');
  const { errors, setErrors } = useContext(ErrorContext);
  const [ windowOpened, setWindowOpened ] = useState(false);

  // Listen for dispatched messages (from popup window)
  useEffect(() => {

    if (windowOpened) {

      const getUserAccessToken = async (code) => {
        try {
          const response = await FlaskAPI.getUserToken(code.toString());
          storeTokenInfo(response.data);
          setToken(null);
        } catch (err) {
          authenticationErrorHandler(err, setErrors, errors);
        }
      };

      const windowEventHandler = (e) => {

        const hash = e.data; // Extract payload

        if (hash && (hash.type === MESSAGE_TYPE)) {

          setWindowOpened(false);

          if (hash.code) {
            const code = hash.code; // Extract code
            getUserAccessToken(code);
          }
        }
      };

      window.addEventListener('message', windowEventHandler, false);

      return () => {
        window.removeEventListener('message', windowEventHandler);
      };
    }
  }, [windowOpened, setWindowOpened, setToken, token, errors, setErrors]);

  const logout = () => {
    localStorage.removeItem('tokenInfo');
    setToken(false);
  };

  // Redirects user to Spotify authorization page (via popup)
  const connectWithSpotify = () => {
    const url = SpotifyAPI.getAuthorizationURL();
    const LEFT = window.screen.width / 2 - POPUP_WIDTH / 2;
    const TOP = window.screen.height / 2 - POPUP_HEIGHT / 2;

    // To spawn a new window and then reference it
    const popupWindow = window.open(
      url,
      "Spotify Login",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        POPUP_WIDTH +
        ", height=" +
        POPUP_HEIGHT +
        ", top=" +
        TOP +
        ", left=" +
        LEFT
    );

    if (popupWindow) popupWindow.opener = window; // To reference the window that spawned this one

    setWindowOpened(true);
  };

  // Reacts to user's input
  const handleSearchInputChange = async (e) => {

    // Change search input
    const searchInput = e.target.value;
    setKeyWords(searchInput);

    // Search for a list of tracks
    if (searchInput) {
      try {
        const response = await SpotifyAPI.searchTrack(token, searchInput);
        setTracks(response.data.tracks.items);
      } catch (err) {
        regularErrorHandler(err, setTracks, setErrors, errors);
      }
    }
  };

  // User selects a track from the list of tracks
  const onTrackSelect = async (track) => {

    // Save selected track
    setTrack(track);
    const track_id = track.id; // Extract track id

    // Get genres associated w/ track
    let response;
    const artist_id = track.artists[0].id; // Extract artist id
    try {
      response = await SpotifyAPI.getArtist(token, artist_id);
    } catch (err) {
      regularErrorHandler(err, setTracks, setErrors, errors);
      return;
    }

    // Analyze genres
    const genres = response.data.genres; // Extract genres
    if (genres.length <= 0) { // No genres found
      // TO-DO
    } 

    else { // Genres found
      if (genres.length <= 3) { // Less than 3 genres found
        // Get recommendations
        try {
          response = await SpotifyAPI.getRecommendations(token, track_id, artist_id, genres);
          setPlaylist([track].concat(response.data.tracks));
        } catch (err) {
          regularErrorHandler(err, setTracks, setErrors, errors);
          return;
        }
      } 
      
      else { // More than 3 genres found
        // Get recommendations
        const newGenres = genres.slice(0, 3); // Extract only 3 genres
        try {
          response = await SpotifyAPI.getRecommendations(token, track_id, artist_id, newGenres);
          setPlaylist([track].concat(response.data.tracks));
        } catch (err) {
          regularErrorHandler(err, setTracks, setErrors, errors);
          return;
        }
      }
    }
  };

  return (
    <Header>
      <LogoBox>
        <img src={Logo} alt="logo" className="logo" />
      </LogoBox>
      {loggedIn ? <Nav><span className="nav-items">My Playlists</span><span onClick={logout} className="nav-items">Logout</span></Nav> : <Login onClick={connectWithSpotify}><img className="spotify-logo" alt="Spotify" src={Spotify} /><span>Connect with Spotify</span></Login>}
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