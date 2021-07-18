import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'InicioSesion',
		component: () => import('../views/InicioSesion.vue'),
	},
	{
		path: '/inicio',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/registro',
		name: 'RegistroUsuario',
		component: () => import('../views/RegistroUsuario.vue'),
	},
	{
		path: '/forms',
		name: 'Forms',
		component: () => import('../views/Forms.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
