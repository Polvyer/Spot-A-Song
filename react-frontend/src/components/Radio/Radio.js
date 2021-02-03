import React from 'react';
import { Container, RadioInput, RadioControl } from './Styles';

const Radio = ({ text, radioClass, status, setValues }) => {
  
  return (
    <Container>
      <RadioInput htmlFor={radioClass}>
        <input id={radioClass} name="status" onChange={setValues} checked={status === text.toLowerCase()} type="radio" value={text.toLowerCase()} />
        <RadioControl className="radio__control" />
      </RadioInput>
      <label>{text}</label>
    </Container>
  );
};

export default Radio;