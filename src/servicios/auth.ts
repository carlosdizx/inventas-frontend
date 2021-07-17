import { CLIENTE } from './axios';
const QUERY_STRING = require('querystring');
const CREDENCIALES = btoa('inventas' + ':' + '7423102ca');

export const LOGUEAR = async (username: any, password: any) =>
	await CLIENTE.post(
		'oauth/token',
		QUERY_STRING.stringify({
			grant_type: 'password',
			username: username,
			password: password,
		}),
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + CREDENCIALES,
			},
		}
	);
