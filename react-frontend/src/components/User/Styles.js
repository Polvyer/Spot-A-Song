import styled from 'styled-components';

const Header = styled.header`
  height: 65.5vh;
  background-color: #257bba;
  position: relative;

  @media screen and (min-height: 800px) {
    height: 50vh;
  }
`;

const LogoBox = styled.div`
  position: absolute;
  left: 25px;
  cursor: pointer;

  .logo {
    height: 130px;
  }

  @media screen and (max-width: 500px) {
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Nav = styled.nav`
  position: absolute;
  right: 25px;
  top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  .nav-items {
    color: white;
    padding: 15px 5px;
    cursor: pointer;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.42857143;
    margin-right: 15px;

    :hover {
      color: #73c9b9;
    }
  }

  @media screen and (max-width: 500px) {
    top: 26%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const InputBox = styled.div`
  z-index: 3;
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  width: fit-content;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;

  @media screen and (max-width: 500px) {
    top: 55%;
  }

  @media screen and (max-height: 1000px) {
    top: 50%;
  }
`;

const HeadingPrimary = styled.h1`
  backface-visibility: hidden;
  margin-bottom: 60px;
  line-height: 1.4em;
  margin-bottom: 25px;
  width: 60%;
  margin: 0 auto;

  .heading-primary-main {
    display: block;
    color: #f2f0ea;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 50px;
  }
`;

const Avatar = styled.figure`
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  bottom: -6rem;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 0 0 8px rgb(115 201 185 / 20%);
  border: 8px solid rgba(115, 201, 185, .5);

  .avatar {
    width: 100%;
    height: 100%;
  }
`;

const Body = styled.div`
  padding: 120px 50px;
`;

const None = styled.h3`
  margin: 20px 0;
  text-align: center;
  color: lightslategray;
`;

const Toggles = styled.div`
  display: flex;
  justify-content: center;

  .toggle {
    border: 1px solid black;
    font-size: 1.1.rem;
    color: #257bba;
    padding: 15px 20px;
    background-color: #f3f3f5;
    line-height: 1.42857143;
    font-size: 500;
    border: none;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }
  }

  .toggle1 {
    border-radius: 4px 0 0 4px;
  }

  .toggle2 {
    border-radius: 0 4px 4px 0;
  }

  .toggled {
    color: white;
    background-color: #257bba;

    :hover {
      background-color: #257bba;
    }
  }
`;

export {
  Header,
  LogoBox,
  Nav,
  InputBox,
  TextBox,
  HeadingPrimary,
  Avatar,
  Body,
  Toggles,
  None,
};