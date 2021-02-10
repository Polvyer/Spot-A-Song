import React from 'react';
import styled from 'styled-components';
import GitHub from '../../images/github.svg';
import LinkedIn from '../../images/linkedin.svg';
import { LINKEDIN_LINK, GITHUB_LINK } from '../../constants/constants';

const Container = styled.footer`
  width: 100%;
  padding: 30px;
  background-color: #73c9b9;

  .socials {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .creator {
    font-size: 1.2rem;
    color: white;
  }

  .links {
    cursor: pointer;
    margin-left: 10px;
    width: 1.8em;
  }
`;

const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  win.focus();
};

const Footer = () => {
  return (
    <Container>
      <div className="socials"><span className="creator">William Ocampo</span><img onClick={openInNewTab.bind(null, GITHUB_LINK)} className="links" src={GitHub} alt="GitHub" /><img onClick={openInNewTab.bind(null, LINKEDIN_LINK)} className="links" src={LinkedIn} alt="LinkedIn" /></div>
    </Container>
  )
}

export default Footer;