/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { FLASK_TOKEN_ENDPOINT } from '../constants/constants';

// Get Spotify access token
const getToken = () => {
  return axios.get(FLASK_TOKEN_ENDPOINT);
};

// Get Spotify access token + User authorization
const getUserToken = (code) => {

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `code=${code}`,
    method: 'POST'
  };

  return axios(FLASK_TOKEN_ENDPOINT, config);
};

// Get Spotify refreshed access token + User authorization
const getRefreshedToken = (refresh_token) => {

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `refresh_token=${refresh_token}`,
    method: 'POST'
  };

  return axios(FLASK_TOKEN_ENDPOINT, config);
};

export default {
  getToken: getToken,
  getUserToken: getUserToken,
  getRefreshedToken: getRefreshedToken,
};