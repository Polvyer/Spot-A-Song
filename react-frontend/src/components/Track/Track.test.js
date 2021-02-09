import React from 'react'
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Track from './Track';

test('renders content', () => {
  const track = {
    id: '676020425',
    name: 'Baby',
    artists: [{ name: 'Justin Bieber' }],
  };

  const foo = () => {
    console.log('Test');
  };

  const component = render(
    <Track track={track} trackPlaying={false} setTrackPlaying={foo} removeTrack={foo} handleDragStart={foo} handleDragEnter={foo} handleDrop={foo} draggable={false} setDraggable={foo} dataTransfer={foo} handleDragOver={foo} handleDragEnd={foo} />
  );

  expect(component.container).toHaveTextContent(
    'Baby, Justin Bieber'
  );
});