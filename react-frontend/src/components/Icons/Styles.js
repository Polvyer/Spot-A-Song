import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  flex-basis: 330px;

  @media screen and (max-width: 1029px) {
    background-color: #f6f6f9;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .my-playlists {
    padding: 20px;
    color: black;
    font-size: 1.1rem;
    cursor: pointer;

    :hover {
      color: #257bba;
    }

    @media screen and (max-width: 1029px) {
      margin-bottom: 63px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;

  .likes {
    cursor: not-allowed;
  }

  @media screen and (max-width: 1029px) {
    background-color: #FFF;
    order: 1;
    position: fixed;
    bottom: 0;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  border-top: 1px solid #f3f3f5;
  border-right: 1px solid #f3f3f5;
  border-bottom: 1px solid #f3f3f5;
  cursor: pointer;
  position: relative;

  .icon {
    width: 15%;
    height: 63px;

    @media screen and (max-width: 1029px) {
      width: 10%;
    }
  }

  :hover .icon {
    filter: invert(36%) sepia(76%) saturate(594%) hue-rotate(165deg) brightness(100%) contrast(89%);
  }

  :hover .popover__content {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate(0, -10px);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);

    @media screen and (max-width: 1029px) {
      transform: translate(0, 10px);
    }
  }
`;

const Popover = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 100%;
  background-color: rgba(0, 0 ,0, 0.8);
  padding: 10px;
  border-radius: 10px;
  width: auto;

  @media screen and (max-width: 1029px) {
    top: -100%;
  }

  ::before {
    position: absolute;
    z-index: -1;
    content: "";
    right: calc(50% - 10px);
    top: -10px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent rgba(0, 0 ,0, 0.8) transparent;
    transition-duration: 0.3s;
    transition-property: transform;

    @media screen and (max-width: 1029px) {
      top: 100%;
      border-color: rgba(0, 0 ,0, 0.8) transparent transparent transparent;
      border-width: 10px 10px 10px 10px;
    }
  }

  .popover__message {
    color: white;
  }
`;

export {
  Container,
  Section,
  Nav,
  Wrapper,
  Popover,
}