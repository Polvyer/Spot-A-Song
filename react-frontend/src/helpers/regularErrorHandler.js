export const regularErrorHandler = (err, setTracks, setErrors, errors) => {
  if (err.response) {
    if (err.response.status === 400) { // Bad request
      setTracks([]);
    }
    if (err.response.status === 401) { // Invalid token
      setErrors(errors.concat(err.response.data.error.message));
    }
  } else { // Unknown error
    setErrors(errors.concat('Unknown error'));
  }
}