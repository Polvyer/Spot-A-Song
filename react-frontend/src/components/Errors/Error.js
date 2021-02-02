import React from 'react'
import { Container } from './Styles';
import x from '../../images/x.svg';

const Error = ({ error, index, closeError }) => {
  
  return (
    <Container>
      <span className="error">{error}</span>
      <img onClick={closeError.bind(null, index)} className="close" src={x} alt="Close" />
    </Container>
  );
};

export default Error;