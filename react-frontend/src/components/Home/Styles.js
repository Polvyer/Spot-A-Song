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
`

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

  .dropdown {
    position: relative;
    width: 37.5em;
    left: 50%;
    transform: translate(-50%, -10%);

    @media screen and (max-width: 800px) {
      width: 88%;
    }
  }
`

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
`

export {
  Header,
  LogoBox,
  TextBox,
  HeadingPrimary,
}