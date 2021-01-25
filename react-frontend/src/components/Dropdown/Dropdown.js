import React, { useRef } from 'react';
import { useInFocus } from '../../hooks/useOutsideAlerter';
import { Search, Content } from './Styles';

const Dropdown = ({ keywords, handleChange, tracks }) => {

  const dropdownRef = useRef();
  const refInFocus = useInFocus(dropdownRef);

  return (
    <div ref={dropdownRef} className="dropdown">
      <Search name="keywords" value={keywords} onChange={handleChange} type="text" className="search" placeholder="Type a song title" />
      <Content className="dropdown-content">
        {refInFocus ? tracks.map((track, index) => <div className="dropdown-item" key={index}>{track.name}, {track.artists[0].name}</div>) : null}
      </Content>
    </div>
  );
};

export default Dropdown;