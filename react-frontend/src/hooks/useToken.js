import { useState, useEffect } from 'react';
import { SEC_TO_MS, ONE_MINUTE } from '../constants/constants';
import SpotifyAPI from '../api/SpotifyAPI';

export const useToken = () => {

  const [ token, setToken ] = useState(null)

  useEffect(() => {

    const getAccessToken = async () => {

      try {
        const response = await SpotifyAPI.requestAuthorization();
        timeout = setTimeout(getAccessToken, response.data.expires_in * SEC_TO_MS); // Request access token every hour
        const tokenInfo = { ...response.data, date_created: Date.now(), date: (new Date()).toLocaleString() }; // Extract token information
        localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));     // Store token information in local storage
        setToken(tokenInfo.access_token);                                 // Set token
      } catch (err) {
        // TO-DO
      }     
    }

    /* Check if user has valid token stored in local storage */
    let timeout;
    const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    const currentDate = Date.now();
    const tokenIsValid = tokenInfo && ((currentDate - tokenInfo.date_created) < (tokenInfo.expires_in * SEC_TO_MS - ONE_MINUTE));

    if (tokenIsValid) { // Valid token
      const time = (tokenInfo.expires_in * SEC_TO_MS) - (currentDate - tokenInfo.date_created);
      timeout = setTimeout(getAccessToken, time); // Get another token when the current one expires
      setToken(tokenInfo.access_token);
    } else { // Missing or invalid, get new token
      getAccessToken();
    }

    /* Clear Timeout */
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return [token, setToken];
}