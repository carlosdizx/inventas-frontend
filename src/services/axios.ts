import axios from 'axios';

export const QUERY_STRING = require('querystring');

export const INSTANCIA = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
});
