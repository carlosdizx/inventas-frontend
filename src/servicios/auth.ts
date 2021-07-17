import { CLIENTE } from './axios';

export const LOGUEAR = async (username: any, password: any) => {
	const credentials = btoa('inventas' + ':' + '7423102ca');
	const querystring = require('querystring');
	await CLIENTE.post(
		'oauth/token',
		querystring.stringify({
			grant_type: 'password',
			username: username,
			password: password,
		}),
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + credentials,
			},
		}
	)
		.then((respuesta) => {
			console.log(JSON.stringify(respuesta.data));
			console.log(respuesta.data);
		})
		.catch((error) => console.log(error));
};
