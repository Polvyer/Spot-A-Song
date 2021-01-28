import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 37.5em;
  left: 50%;
  transform: translate(-50%, -10%);

  @media screen and (max-width: 800px) {
    width: 88%;
  }
`

const Search = styled.input`
  padding: 18px;
  width: 25em;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #f3f3f5;
  font-size: 1.5rem;

  ::placeholder {
    font-size: 1.5rem;
  }

  :active, :focus {
    outline: none;
  }
`

const Content = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  text-align: left;
  margin-top: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

  .dropdown-item {
    color: black;
    padding: 12px 16px;
    background-color: white;
    cursor: pointer;

    :hover {
      background-color: #73c9b9;
      color: white;
    }
  }

  .dropdown-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .dropdown-item:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

export {
  Container,
  Search,
  Content,
}