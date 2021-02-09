import React, { useState, useEffect, useCallback } from 'react';
import { Container, Radios } from './Styles';
import Spotify from '../../images/spotify.png';
import Radio from '../Radio/Radio';
import { useForm } from '../../hooks/useForm';
import SpotifyAPI from '../../api/SpotifyAPI';
import { DEFAULT_PLAYLIST_NAME } from '../../constants/constants';
import FlaskAPI from '../../api/FlaskAPI';

const Information = ({ token, loggedIn, connectWithSpotify, playlist, setShowIcons, setShowModal, setPlaylistInfo, track, setShowLoader }) => {

  const [ values, setValues ] = useForm({ title: '', status: 'public' });
  const [ saved, setSaved ] = useState(false); // Allows the useEffect 'callback' to run

  // Get the unique string identifying the Spotify user
  const getUserID = async (token) => {
    const response = await SpotifyAPI.getUserProfile(token);
    return response.data.id;
  };

  // Creates an empty playlist and returns the playlist id
  const getPlaylistID = useCallback(async (token, user_id, title, status) => {
    const name = title ? title : DEFAULT_PLAYLIST_NAME;
    const publi = status === 'public' ? 'true' : 'false';
    const response = await SpotifyAPI.createPlaylist(token, user_id, name, publi);
    setPlaylistInfo({ url: response.data.external_urls.spotify, uri: response.data.uri });
    return response.data.id;
  }, [setPlaylistInfo]);

  // Finalize the playlist of your dreams based on a song
  const populatePlaylist = async (token, playlist_id, playlist) => {
    const listOfUris = playlist.map(track => track.uri);
    const response = await SpotifyAPI.addToPlaylist(token, playlist_id, listOfUris);
    return response.data;
  };

  // Make the playlist of your dreams based on a song
  const makePlaylist = useCallback(async () => {
    setShowLoader(true); // Show loader
    const user_id = await getUserID(token);
    const playlist_id = await getPlaylistID(token, user_id, values.title, values.status);
    await populatePlaylist(token, playlist_id, playlist);
    await FlaskAPI.createPlaylist(playlist_id, values.status, user_id, track.id, playlist.map(track => track.id));
    setShowLoader(false); // Hide loader
    setShowModal(true); // Show preview of playlist
    setShowIcons(true); // Show icons
  }, [playlist, token, values.status, values.title, setShowIcons, setShowModal, getPlaylistID, track.id, setShowLoader]);

  // A 'callback' that runs after the user finishes connecting with Spotify
  useEffect(() => {
    if (saved && loggedIn) {
      makePlaylist();
      setSaved(false);
    }
  }, [saved, loggedIn, makePlaylist]);

  const saveOnSpotify = async () => {
    if (loggedIn) {
      await makePlaylist();
    } else {
      connectWithSpotify();
      setSaved(true);
    }
  };
  
  return (
    <Container>
      <h3 className="info-title">Playlist Information</h3>
      <input className="info-input-title" name="title" value={values.title} onChange={setValues} type="text" placeholder="Title" />
      <h4 className="info-status">Status</h4>
      <Radios>
        <Radio status={values.status} setValues={setValues} text="Public" radioClass="custom-radio-public" />
        <Radio status={values.status} setValues={setValues} text="Private" radioClass="custom-radio-private" />
      </Radios>
      <button onClick={saveOnSpotify}className="info-submit"><img className="spotify-logo" alt="Spotify" src={Spotify} /><span>Save on Spotify</span></button>
      <div className="info-footer">
        <span className="info-footer-text">You will connect with your Spotify account in order to save your playlist. This process is totally safe.</span>
        <span className="info-footer-text">The playlist will be reproduced on Spotify. We are not a streaming service.</span>
      </div>
    </Container>
  );
};

export default Information;