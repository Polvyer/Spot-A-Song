import React from 'react';
import { Container, Radios } from './Styles';
import Spotify from '../../images/spotify.png';
import Radio from '../Radio/Radio';

const Information = () => {
  return (
    <Container>
      <h3 className="info-title">Playlist Information</h3>
      <input className="info-input-title" type="text" placeholder="Title" />
      <h4 className="info-status">Status</h4>
      <Radios>
        <Radio text="Public" radioClass="custom-radio-public" />
        <Radio text="Private" radioClass="custom-radio-private" />
      </Radios>
      <button className="info-submit"><img className="spotify-logo" alt="Spotify" src={Spotify} /><span>Save on Spotify</span></button>
      <div className="info-footer">
        <span className="info-footer-text">You will connect with your Spotify account in order to save your playlist. This process is totally safe.</span>
        <span className="info-footer-text">The playlist will be reproduced on Spotify. We are not a streaming service.</span>
      </div>
    </Container>
  );
};

export default Information;