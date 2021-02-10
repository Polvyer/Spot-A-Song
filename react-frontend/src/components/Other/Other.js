import React, { useState, useEffect, useContext } from 'react';
import SpotifyAPI from '../../api/SpotifyAPI';
import { errorHandler } from '../../helpers/errorHandler';
import { ErrorContext } from '../../context/ErrorContext';
import { GLOBAL_TOP_50_PLAYLIST_ID } from '../../constants/constants';
import { Body, Deck, Card } from './Styles';

const Other = ({ token, onTrackSelect }) => {

  const { errors, setErrors } = useContext(ErrorContext);
  const [ topTracks, setTopTracks ] = useState([]);
  const [ seeAllTopTracks, setSeeMoreTopTracks ] = useState(false);

  useEffect(() => {
    if (token && errors.length <= 0) {
      SpotifyAPI.getPlaylist(token, GLOBAL_TOP_50_PLAYLIST_ID).then(response => {
        setTopTracks(response.data.tracks.items.map(item => item.track));
      }).catch((err) => {
        errorHandler(err, setErrors, errors);
      });
    }
  }, [errors, setErrors, token]);

  const topTracksToShow = seeAllTopTracks ? topTracks : topTracks.slice(0, 12);

  return (
    <Body>
      <h2>Top Tracks <span onClick={setSeeMoreTopTracks.bind(null, !seeAllTopTracks)}className="mute">{seeAllTopTracks ? "see less" : "see all"}</span></h2>
      <Deck>
        {topTracksToShow.map((track, index) => {
          return (
            <Card key={track.id}>
              <img onClick={onTrackSelect.bind(null, track)} className="album-cover" src={track.album.images[0].url} alt="album-cover" />
              <div className="container">
                <h4><b>#{index + 1} {track.name}</b></h4>
                <p>{track.artists[0].name}</p>
              </div>
            </Card>
          );
        })}
        <Card>
        </Card>
      </Deck>
    </Body>
  );
};

export default Other;