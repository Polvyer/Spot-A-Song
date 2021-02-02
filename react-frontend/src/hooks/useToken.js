import { useState, useEffect } from 'react';
import { SEC_TO_MS, TWO_MINUTE_DELAY_IN_MS, SPOTIFY_REDIRECT_URI } from '../constants/constants';
import FlaskAPI from '../api/FlaskAPI';

// Returns a Spotify access token
export const useToken = () => {

  const [ token, setToken ] = useState(null);
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {

    const getRefreshedAccessToken = async (refresh_token) => {
      try {
        const response = await FlaskAPI.getRefreshedToken(refresh_token);
        timeout = setTimeout(getAccessToken, response.data.expires_in * SEC_TO_MS); // Request access token every hour
        const tokenInfo = { ...response.data, refresh_token, date_created: Date.now(), date: (new Date()).toLocaleString() }; // Extract token information
        localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo)); // Store token information in local storage
        setLoggedIn(true);
        setToken(tokenInfo.access_token); // Set token
      } catch (err) {
        console.log(err);
      }
    };

    const getAccessToken = async () => {
      try {
        const response = await FlaskAPI.getToken();
        timeout = setTimeout(getAccessToken, response.data.expires_in * SEC_TO_MS); // Request access token every hour
        const tokenInfo = { ...response.data, date_created: Date.now(), date: (new Date()).toLocaleString() }; // Extract token information
        localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo)); // Store token information in local storage
        setToken(tokenInfo.access_token); // Set token
      } catch (err) {
        console.log(err);
      }     
    };

    const getUserAccessToken = async (code) => {
      try {
        const response = await FlaskAPI.getUserToken(code);
        const tokenInfo = { ...response.data, date_created: Date.now(), date: (new Date()).toLocaleString() }; // Extract token information
        localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo)); // Store token information in local storage
        window.location.replace(SPOTIFY_REDIRECT_URI); // Change the page without it reflecting in the browser back history
      } catch (err) {
        console.log(err);
      }
    };

    // Extract 'code' from query
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    let timeout; // Used to clear the timeout

    if (code) { // User was recently authorized and redirected
      getUserAccessToken(code);
    }

    else { 
      // Check if user has valid token stored in local storage
      const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
      const currentDate = Date.now();
      const tokenIsValid = tokenInfo && ((currentDate - tokenInfo.date_created) < (tokenInfo.expires_in * SEC_TO_MS - TWO_MINUTE_DELAY_IN_MS));

      if (tokenIsValid) { // Valid token
        const expires_in = (tokenInfo.expires_in * SEC_TO_MS) - (currentDate - tokenInfo.date_created);
        timeout = setTimeout(getAccessToken, expires_in); // Get another token when the current one expires
        setToken(tokenInfo.access_token);

        // Check if user is logged
        if ('refresh_token' in tokenInfo) {
          setLoggedIn(true);
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
    }

    // Clear Timeout
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return [token, setToken, loggedIn, setLoggedIn];
}