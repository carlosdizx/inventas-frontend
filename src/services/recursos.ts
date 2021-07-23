import { INSTANCIA, QUERY_STRING } from './axios';
// -------------------- CLIENTE -----------------
//Authorization;
export const LISTAR_CLIENTES = async (token: any) =>
	await INSTANCIA.get('/api/clientes/all', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const AGREGAR_CLIENTE = async (token: any,cliente:any) =>
	await INSTANCIA.post('/api/clientes/all', cliente,{
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});

// -------------------- PRODUCTO -----------------
export const LISTAR_PRODUCTOS = async (token: any) =>
	await INSTANCIA.get('/api/productos/all', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const AGREGAR_PRODUCTO = async (token: any, productos:any) =>
	await INSTANCIA.post('/api/productos/all', productos,{
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});

// -------------------- FACTURA -----------------
export const LISTAR_FACTURAS = async (token: any) =>
	await INSTANCIA.get('/api/facturas/all', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const AGREGAR_FACTURA = async (token: any, factura: any) =>
	await INSTANCIA.post('/api/facturas/all', factura, {
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
