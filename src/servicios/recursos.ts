import { AXIOS_INSTANCIA, QUERY_STRING } from './axios';
// -------------------- CLIENTE -----------------
//Authorization;
export const LISTADO_CLIENTES = async (token: any) =>
	await AXIOS_INSTANCIA.get('/api/clientes/all',{
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
