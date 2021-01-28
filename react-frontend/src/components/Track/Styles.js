import styled from 'styled-components';

const Li = styled.li`
  border-bottom: 1px solid #e1e1e6;
  padding: 15px 20px 15px 10px;
  color: black;
  list-style: none;
  display: flex;
  justify-content: space-between;

  .circle-audio-player {
    visibility: hidden
  }

  :hover {
    background-color: #73c9b9;
    color: white;

    .circle-audio-player {
      visibility: visible;
      cursor: pointer;
    }
  }
`

export {
  Li,
}