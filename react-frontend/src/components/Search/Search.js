import React, { useState } from 'react';
import { Header, LogoBox, TextBox, HeadingPrimary } from './Styles';
import Dropdown from '../Dropdown/Dropdown';
import Logo from '../../images/logo.png';
import SpotifyAPI from '../../api/SpotifyAPI';

const Search = ({ token, setPlaylist, setTrack }) => {

  const [ tracks, setTracks ] = useState([]);
  const [ keywords, setKeyWords ] = useState('');

  const handleSearchInputChange = async (e) => {

    /* Change search input */
    const searchInput = e.target.value;
    setKeyWords(searchInput);

    /* Search for a list of tracks */
    try {
      const response = await SpotifyAPI.searchTrack(token, searchInput);
      setTracks(response.data.tracks.items);
    } catch (err) {
      if (err.response.data) {
        console.log(err.response);
        if (err.response.status === 400) { // Bad request
          setTracks([]);
        }
        if (err.response.status === 401) { // Invalid token
          // TO-DO
        }
      } else { // Unknown error
        console.log(err);
      }
    }
  }

  const onTrackSelect = async (track, e) => {

    /* Save selected track */
    setTrack(track);
    const track_id = track.id; // Extract track id

    /* Get genres of track */
    let response;
    const artist_id = track.artists[0].id;
    try {
      response = await SpotifyAPI.getArtist(token, artist_id);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        // TO-DO
      }
    }

    /* Analyze genres */
    const genres = response.data.genres;
    if (genres.length <= 0) { // No genres found
      // TO-DO
    } else {
      if (genres.length <= 5) { // Less than 5 genres found
        /* Get recommendations */
        try {
          response = await SpotifyAPI.getRecommendations(token, track_id, artist_id, genres);
          setPlaylist(response.data.tracks);
        } catch (err) {

        }
      } else { // More than 5 genres found
        // TO-DO
      }
    }

    /*
    console.log('Artist ID:', artist_id);
    console.log('Track ID: ', track_id);
    console.log('Genres: ', genres);
    */
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
        <Dropdown tracks={tracks} keywords={keywords} handleSearchInputChange={handleSearchInputChange} onTrackSelect={onTrackSelect} />
      </TextBox>
    </Header>
  );
};

export default Search;