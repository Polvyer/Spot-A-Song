import React, { useState, useContext } from 'react';
import { Header, Login, LogoBox, TextBox, HeadingPrimary } from './Styles';
import Dropdown from '../Dropdown/Dropdown';
import Logo from '../../images/logo.png';
import SpotifyAPI from '../../api/SpotifyAPI';
import Spotify from '../../images/spotify.png';
import { ErrorContext } from '../../context/ErrorContext';
import { regularErrorHandler } from '../../helpers/regularErrorHandler';

const Search = ({ token, setPlaylist, setTrack, loggedIn }) => {

  const [ tracks, setTracks ] = useState([]);
  const [ keywords, setKeyWords ] = useState('');
  const { errors, setErrors } = useContext(ErrorContext);

  // Redirects user to Spotify authorization page
  const connectWithSpotify = () => {
    const url = SpotifyAPI.getAuthorizationURL();
    window.location.assign(url);
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
      {loggedIn ? null : <Login onClick={connectWithSpotify}><img className="spotify-logo" alt="Spotify" src={Spotify} /><span>Connect with Spotify</span></Login>}
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