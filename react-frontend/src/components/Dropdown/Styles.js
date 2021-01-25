import styled from 'styled-components';

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
  Search,
  Content,
}