import styled from 'styled-components';

const Header = styled.header`
  height: 65.5vh;
  background-image: linear-gradient(
    to bottom,
    #257bba,
    #73c9b9);
  position: relative;
`;

const LogoBox = styled.div`
  position: absolute;
  left: 25px;

  .logo {
    height: 130px;
  }

  @media screen and (max-width: 500px) {
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Login = styled.button`
  position: absolute;
  right: 25px;
  top: 40px;
  padding: 15px;
  background-color: transparent;
  color: white;
  border: 1px solid #fff;
  font-weight: 400;
  cursor: pointer;
  display: block;
  border-radius: 4px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  letter-spacing: .5px;

  .spotify-logo {
    width: 1.4em;
    margin-right: 5px;
  }

  @media screen and (max-width: 500px) {
    top: 26%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;

  @media screen and (max-width: 800px) {
    top: 55%;
  }

  @media screen and (max-width: 500px) {
    top: 65%;
  }
`;

const HeadingPrimary = styled.h1`
  backface-visibility: hidden;
  margin-bottom: 60px;
  line-height: 1.4em;
  margin-bottom: 25px;

  .heading-primary-main {
    display: block;
    color: #f2f0ea;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .heading-primary-sub {
    display: block;
    color: #e6e6e6;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: .5px;
  }
`;

export {
  Header,
  Login,
  LogoBox,
  TextBox,
  HeadingPrimary,
};