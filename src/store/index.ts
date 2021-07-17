import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import { LOGUEAR } from '@/servicios/auth';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usuario: {},
	},
	mutations: {
		ASIGNAR_USUARIO: (state: { usuario: Object }, usuario: Object) =>
			(state.usuario = usuario),
	},
	actions: {
		asignarUsuario: async ({ commit }: { commit: Commit }, usuario: any) => {
			await LOGUEAR(usuario.username, usuario.password)
				.then((respuesta) => {
					const usuario: any = JSON.parse(
                        decodeURIComponent(escape(atob(respuesta.data.access_token.split('.')[1])))
					);
					commit('ASIGNAR_USUARIO', usuario);
					localStorage.setItem('token', JSON.stringify(respuesta.data));
					router.push('/');
				})
				.catch((error) => console.log(error));
		},
	},
	modules: {},
});
