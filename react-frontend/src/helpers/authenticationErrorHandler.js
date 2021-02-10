export const authenticationErrorHandler = (err, setErrors, errors) => {
  if (err.response) {
    setErrors([err.response.data.error]);
  } else { // Unknown error
    setErrors(['Unknown error']);
  }
};