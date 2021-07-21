import { INSTANCIA, QUERY_STRING } from './axios';
const CREDENCIALES = btoa('inventas' + ':' + '7423102ca');

export const LOGUEAR = async (username: any, password: any) =>
	await INSTANCIA.post(
		'oauth/token',
		QUERY_STRING.stringify({
			grant_type: 'password',
			username: username,
			password: password,
		}),
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
				Authorization: 'Basic ' + CREDENCIALES,
			},
		}
	);
