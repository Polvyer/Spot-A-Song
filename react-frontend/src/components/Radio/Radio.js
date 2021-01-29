import React from 'react';
import { Container, RadioInput, RadioControl } from './Styles';

const Radio = ({ text, radioClass }) => {
  
  return (
    <Container>
      <RadioInput htmlFor={radioClass}>
        <input id={radioClass} type="radio" name={text.toLowerCase()} />
        <RadioControl className="radio__control" />
      </RadioInput>
      <label>{text}</label>
    </Container>
  );
};

export default Radio;