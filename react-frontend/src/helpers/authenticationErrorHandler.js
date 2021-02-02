export const authenticationErrorHandler = (err, setErrors, errors) => {
  if (err.response) {
    setErrors(errors.concat(err.response.data.error));
  } else { // Unknown error
    setErrors(errors.concat('Unknown error'));
  }
};