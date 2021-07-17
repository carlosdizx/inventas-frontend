import axios from 'axios';

export const CLIENTE = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
});
