import { INSTANCIA, QUERY_STRING } from './axios';
// -------------------- CLIENTE -----------------
//Authorization;
export const LISTAR_CLIENTES = async (token: any) =>
	await INSTANCIA.get('/api/clientes/all', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

// -------------------- PRODUCTO -----------------
export const LISTAR_PRODUCTOS = async (token: any) =>
	await INSTANCIA.get('/api/productos/all', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

// -------------------- FACTURA -----------------
export const LISTAR_FACTURAS = async (token: any) =>
	await INSTANCIA.get('/api/facturas/all', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const AGREGAR_FACTURA = async (token: any, factura: any) => {
	const headers: Headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', 'Bearer ' + token);
	headers.append('Accept', 'application/json');
	console.log(
		QUERY_STRING.stringify({ items: factura.items, descripcion: factura.descripcion })
	);
	return await INSTANCIA.post(
		'/api/facturas/all',
		{ items: factura.items, descripcion: factura.descripcion },
		{
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type':'application/json'
			},
		}
	);
};

export const REGISTRAR_FACTURA = async (token: any, factura: any) => {
	console.log(factura);
	return await (
		await fetch('http://localhost:8090/api/facturas/all', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json',
			},
			body: QUERY_STRING.stringify(
				factura
				/**
			 {
				items: [
					{
						cantidad: 5,
						producto: {
							id: 1,
							nombre: 'Salchipapa Mixta',
							precioCompra: 6000.0,
							precioVenta: 7000.0,
						},
					},
					{
						cantidad: 3,
						producto: {
							id: 2,
							nombre: 'Salchipapa BBQ',
							precioCompra: 5000.0,
							precioVenta: 6000.0,
						},
					},
				],
				descripcion: '1082749257',
			}
			 */
			),
		})
	).json();
};
