<template>
	<div>
		<ToolBarNav :tabs="tabs" />
		<router-link to="/" v-slot="{ navigate }" custom>
			<v-btn block @click="navigate">Login</v-btn>
		</router-link>
		<router-link to="registro" v-slot="{ navigate }" custom>
			<v-btn block @click="navigate">Registro</v-btn>
		</router-link>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';
	import ToolBarNav from '../components/ToolBarNav';

	export default Vue.extend({
		name: 'Inicio',
		components: {
			ToolBarNav,
		},
		data: () => ({
			tabs: [''],
		}),
		computed: {
			...mapState(['usuario', 'token']),
		},
		methods: {
			...mapActions(['comprobarToken']),
		},
		async created() {
			this.tabs = [
				{ link: '/inicio', icono: 'mdi-home' },
        { link: '/cajaregistradora', icono: 'mdi-cash-register' },
        { link: '/listados', icono: 'mdi-clipboard-list-outline' },
				{ link: '/inicio', icono: 'mdi-plus-circle-outline' },
				{ link: '/inicio', icono: 'mdi-food-variant' },
				{ link: '/inicio', icono: 'mdi-account-multiple' },
				{ link: '/inicio', icono: 'mdi-receipt' },
				{ link: '/inicio', icono: 'mdi-file-document' },
				{ link: '/inicio', icono: 'mdi-poll' },
			];
			await this.comprobarToken();
		},
	});
</script>
