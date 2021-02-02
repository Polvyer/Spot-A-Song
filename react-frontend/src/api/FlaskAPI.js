/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { FLASK_TOKEN_ENDPOINT } from '../constants/constants';

const getToken = () => {
  return axios.get(FLASK_TOKEN_ENDPOINT);
};

export default {
  getToken: getToken
};