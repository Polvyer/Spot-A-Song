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

  .trash {
    visibility: hidden;
    width: 2em;
    margin-left: 5px;
    transform: translateY(-1px);
  }

  :hover {
    background-color: #73c9b9;
    color: white;

    .circle-audio-player {
      visibility: visible;
      cursor: pointer;
    }

    .trash {
      visibility: visible;
      cursor: pointer;
    }
  }
`

const Icons = styled.div`
  display: flex;
  align-items: flex-start;
`;

export {
  Li,
  Icons,
}