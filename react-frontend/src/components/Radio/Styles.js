import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  label {
    font-size: 1rem;
    color: #73c9b9;
    font-weight: 500;
    margin-left: 14px;
    margin-bottom: 5px;
    line-height: 1.42857143;
  }
`;

const RadioInput = styled.label`
  display: flex;
  cursor: pointer;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    :checked + .radio__control {
      background: radial-gradient(#73c9b9 50%, white 51%);
      /*background: #73c9b9;*/
      border: 2px solid #73c9b9;
    }
  }
`;

const RadioControl = styled.span`
  display: block;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  border: 2px solid #88899f;
  background-color: white;
  transform: translateY(0.05em);
`;

export {
  Container,
  RadioInput,
  RadioControl,
}