import axios from 'axios';

export const QUERY_STRING = require('querystring');

axios.defaults.withCredentials = true;
export const INSTANCIA = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
});
