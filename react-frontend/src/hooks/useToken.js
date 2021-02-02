import { useState, useEffect } from 'react';
import { SEC_TO_MS, TWO_MINUTE_DELAY_IN_MS } from '../constants/constants';
import FlaskAPI from '../api/FlaskAPI';
import { storeTokenInfo } from '../helpers/storeTokenInfo';
import { authenticationErrorHandler } from '../helpers/authenticationErrorHandler';

// Returns a Spotify access token
export const useToken = (errors, setErrors) => {

  const [ token, setToken ] = useState(null);
  const [ loggedIn, setLoggedIn ] = useState(false)

  useEffect(() => {

    const getRefreshedAccessToken = async (refresh_token) => {
      try {
        const response = await FlaskAPI.getRefreshedToken(refresh_token);
        response.data.refresh_token = refresh_token; // Store refresh token
        const tokenInfo = storeTokenInfo(response.data);
        timeout = setTimeout(getRefreshedAccessToken.bind(null, refresh_token), tokenInfo.expires_in * SEC_TO_MS); // Request access token every hour
        setLoggedIn(true);
        setToken(tokenInfo.access_token);
      } catch (err) {
        authenticationErrorHandler(err, setErrors, errors);
      }
    };

    const getAccessToken = async () => {
      try {
        const response = await FlaskAPI.getToken();
        const tokenInfo = storeTokenInfo(response.data);
        timeout = setTimeout(getAccessToken, response.data.expires_in * SEC_TO_MS); // Request access token every hour
        setLoggedIn(false);
        setToken(tokenInfo.access_token);
      } catch (err) {
        authenticationErrorHandler(err, setErrors, errors);
      }     
    };

    let timeout; // Used to clear the timeout

    // Check if user has valid token stored in local storage
    const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    const currentDate = Date.now();
    const tokenIsValid = tokenInfo && ((currentDate - tokenInfo.date_created) < (tokenInfo.expires_in * SEC_TO_MS - TWO_MINUTE_DELAY_IN_MS));

    if (tokenIsValid) { // Valid token

      const expires_in = (tokenInfo.expires_in * SEC_TO_MS) - (currentDate - tokenInfo.date_created);
      setToken(tokenInfo.access_token);

      if ('refresh_token' in tokenInfo) {
        timeout = setTimeout(getRefreshedAccessToken.bind(null, tokenInfo.refresh_token), expires_in); // Request access token every hour
        setLoggedIn(true);
      } else {
        timeout = setTimeout(getAccessToken, expires_in); // Get another token when the current one expires
        setLoggedIn(false);
      }
    } 
    
    else { // Missing or invalid, get new token
      // Check if user has a refresh_token in local storage
      if (tokenInfo && ('refresh_token' in tokenInfo)) {
        getRefreshedAccessToken(tokenInfo.refresh_token);
      } else {
        getAccessToken();
      }
    }

    // Clear Timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [token, errors, setErrors]);

  return [token, setToken, loggedIn];
}