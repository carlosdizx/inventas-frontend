import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/inicio',
		name: 'InicioSesion',
		component: () => import('../views/InicioSesion.vue'),
	},
	{
		path: '/registrousuario',
		name: 'RegistroUsuario',
		component: () => import('../views/RegistroUsuario.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
