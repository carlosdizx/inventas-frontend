import { AXIOS_INSTANCIA } from './axios';
// -------------------- CLIENTE -----------------
//Authorization;
export const LISTAR_CLIENTES = async (token: any) =>
	await AXIOS_INSTANCIA.get('/api/clientes/all',{
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
