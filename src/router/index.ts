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
		component: () => import('../views/Inicio.vue'),
	},
	{
		path: '/registro',
		name: 'Registro',
		component: () => import('../views/forms/Registro.vue'),
	},
	{
		path: '/listados',
		name: 'Forms',
		component: () => import('../views/listados/Listado.vue'),
	},
	{
		path: '/cajaregistradora',
		name: 'CajaRegistradora',
		component: () => import('../views/forms/CajaRegistradora.vue'),
	},
	{
		path: '/facturas',
		name: 'ListadosFacturas',
		component: () => import('../views/listados/ListadosFacturas.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
