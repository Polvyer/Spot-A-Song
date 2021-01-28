import React, { useRef } from 'react';
import { useInFocus } from '../../hooks/useInFocus';
import { Container, Search, Content } from './Styles';

const Dropdown = ({ keywords, handleSearchInputChange, tracks, onTrackSelect }) => {

  const dropdownRef = useRef();
  const refInFocus = useInFocus(dropdownRef);

  return (
    <Container ref={dropdownRef} className="dropdown">
      <Search autoComplete="off" name="keywords" value={keywords} onChange={handleSearchInputChange} type="search" className="search" placeholder="Type a song title" />
      <Content className="dropdown-content">
        {refInFocus ? tracks.map((track, index) => <div className="dropdown-item" onClick={onTrackSelect.bind(null, track)} key={index}>{track.name}, {track.artists[0].name}</div>) : null}
      </Content>
    </Container>
  );
};

export default Dropdown;