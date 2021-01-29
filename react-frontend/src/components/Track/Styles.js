import styled from 'styled-components';

const Li = styled.li`
  border-bottom: 1px solid #e1e1e6;
  padding: 5px 20px 5px 10px;
  color: black;
  list-style: none;
  display: flex;
  justify-content: space-between;

  .drag {
    visibility: hidden;
    margin-right: 10px;
  }

  .circle-audio-player {
    visibility: hidden;
  }

  .trash {
    visibility: hidden;
    width: 2.1em;
    margin-left: 5px;
  }

  :hover {
    background-color: #73c9b9;
    color: white;

    .drag {
      visibility: visible;
    }

    .circle-audio-player {
      visibility: visible;
      cursor: pointer;
    }

    .trash {
      visibility: visible;
      cursor: pointer;
    }
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

const Drag = styled.div`
  width: 30px;
  height: 20px;
  cursor: move;
  background-image: ${props => `url(${props.background})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 3px -1px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

export {
  Li,
  Text,
  Drag,
  Icons,
}