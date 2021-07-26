import Vue from 'vue';
import Vuex, { Commit, createLogger } from 'vuex';
import { LOGUEAR } from '@/services/auth';
import router from '@/router';
import {
	AGREGAR_CLIENTE,
	AGREGAR_FACTURA,
	AGREGAR_INVENTARIO,
	AGREGAR_PRODUCTO, LISTAR_ACTIVOS,
	LISTAR_CLIENTES,
	LISTAR_FACTURAS,
	LISTAR_INVENTARIOS,
	LISTAR_PRODUCTOS,
} from '@/services/recursos';
import Swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usuario: {},
		token: null,
	},
	mutations: {
		ASIGNAR_USUARIO: (state: { usuario: Object }, usuario: any) =>
			(state.usuario = usuario),
		ASIGNAR_TOKEN: (state: { token: any }, token: String) => (state.token = token),
	},
	actions: {
		loguearUsuario: async ({ commit }: { commit: Commit }, usuario: any) => {
			await LOGUEAR(usuario.username, usuario.password)
				.then((respuesta) => {
					const usuario: any = JSON.parse(
						decodeURIComponent(escape(atob(respuesta.data.access_token.split('.')[1])))
					);
					commit('ASIGNAR_USUARIO', usuario);
					commit('ASIGNAR_TOKEN', respuesta.data);

					localStorage.setItem('token', JSON.stringify(respuesta.data));
					router.push('/inicio');
				})
				.catch((error) => {
					Swal.fire(
						'Error',
						`${
							error.message === 'Request failed with status code 400'
								? 'Credenciales erroneas'
								: JSON.stringify(error)
						}`,
						'error'
					);
					console.log(error);
				});
		},
		cargarDatos: async ({ commit, state }) => {
			if (state.token !== null) {
				return;
			}
			const token = localStorage.getItem('token');
			if (token !== null) {
				const usuario: any = JSON.parse(
					decodeURIComponent(escape(atob(token.split('.')[1])))
				);
				commit('ASIGNAR_USUARIO', usuario);
				commit('ASIGNAR_TOKEN', token);
				return;
			}
		},
		comprobarToken: async ({ commit, dispatch, state }) => {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			if (state.token !== null || token !== null) {
				await dispatch('listarClientes', Array()).catch(async (reason) => {
					commit('ASIGNAR_USUARIO', {});
					commit('ASIGNAR_TOKEN', null);
					console.log(reason);
					await Swal.fire('Por seguridad', 'Vuelve a iniciar sesion 👌', 'info');
					return await router.push('/');
				});
				return;
			}
			await Swal.fire('Iniciar sesion', 'Vuelve a iniciar sesion 👌', 'info');
			await router.push('/');
		},
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------- CLIENTES -------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		listarClientes(): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return LISTAR_CLIENTES(token.access_token);
		},
		agregarCliente({ commit }, cliente: any): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return AGREGAR_CLIENTE(token.access_token, cliente);
		},
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------- PRODUCTOS -------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		listarProductos(): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return LISTAR_PRODUCTOS(token.access_token);
		},
		agregarProducto({ commit }, producto: any): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return AGREGAR_PRODUCTO(token.access_token, producto);
		},
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------- FACTURAS -------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		listarFacturas(): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return LISTAR_FACTURAS(token.access_token);
		},
		agregarFactura: ({ commit }, factura: any) => {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return AGREGAR_FACTURA(token.access_token, factura);
		},
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------- INVENTARIOS -------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		listarInventarios(): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return LISTAR_INVENTARIOS(token.access_token);
		},
		agregarInventarios: ({ commit }, inventario: any) => {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return AGREGAR_INVENTARIO(token.access_token, inventario);
		},
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------- ACTIVOS -------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		listarActivos(): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return LISTAR_ACTIVOS(token.access_token);
		},
	},
	modules: {},
	getters: {},
});
