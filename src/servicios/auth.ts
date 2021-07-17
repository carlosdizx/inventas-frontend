import { CLIENTE } from './axios';
import router from '@/router';

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
			const accessToken : any = JSON.parse(atob(respuesta.data.access_token.split('.')[1]));
			localStorage.setItem('token', JSON.stringify(respuesta.data));
			router.push('/');
		})
		.catch((error) => console.log(error));
};
