import React, { useState } from 'react';
import Track from '../Track/Track';
import { Ul } from './Styles';

const Scrollable = ({ track, playlist }) => {

  const [ trackPlaying, setTrackPlaying ] = useState(null);

  return (
    <Ul>
      <Track trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} track={track} />
      {playlist.map((track) => <Track key={track.id} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} track={track} />)}
    </Ul>
  );
};

export default Scrollable;