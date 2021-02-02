import React from 'react'
import { Deck } from './Styles';
import Error from './Error';

const Errors = ({ errors, setErrors }) => {

  const closeError = (index) => {
    const newErrors = [ ...errors ];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  return (
    <Deck>
      {errors.map((error, index) => <Error key={index} error={error} index={index} closeError={closeError} />)}
    </Deck>
  );
};

export default Errors;