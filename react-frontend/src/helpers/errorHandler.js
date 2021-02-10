export const errorHandler = (err, setErrors, errors) => {
  if (err.response) {
    if (err.response.status === 400) { // Bad request
      setErrors(['Oops! Something went wrong! Try again.']);
    } else if (err.response.status === 401) { // Invalid token
      setErrors([err.response.data.error.message]);
    } else {
      setErrors(['Oops! Something went wrong! Try again.']);
    }
  } else { // Unknown error
    setErrors(['Unknown error']);
  }
};