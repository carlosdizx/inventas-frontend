import Vue from 'vue';
import Vuex, { Commit, createLogger } from 'vuex';
import { LOGUEAR } from '@/servicios/auth';
import router from '@/router';
import {
	AGREGAR_FACTURA,
	LISTAR_CLIENTES,
	LISTAR_FACTURAS,
	LISTAR_PRODUCTOS,
} from '@/servicios/recursos';
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
			if (state.token === null || token !== null) {
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
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------- PRODUCTOS -------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		listarProductos(): any {
			const token: any = JSON.parse(<string>localStorage.getItem('token'));
			return LISTAR_PRODUCTOS(token.access_token);
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
	},
	modules: {},
	getters: {},
});
