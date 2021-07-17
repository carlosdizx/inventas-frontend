import axios from 'axios';

export const QUERY_STRING = require('querystring');


export const AXIOS_INSTANCIA = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
});

const CREDENCIALES = btoa('inventas' + ':' + '7423102ca');

//CLIENTE.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
//CLIENTE.defaults.headers.common['Authorization'] = 'Basic ' + CREDENCIALES;
