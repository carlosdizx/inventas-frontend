<template>
	<div>
		<ToolBarNav :tabs="tabs" />
		<router-link to="inicio" v-slot="{ navigate }" custom>
			<v-btn block @click="navigate">Login</v-btn>
		</router-link>
		<router-link to="registro" v-slot="{ navigate }" custom>
			<v-btn block @click="navigate">Registro</v-btn>
		</router-link>
		{{ usuario }}
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';
	import ToolBarNav from '../components/ToolBarNav';

	export default Vue.extend({
		name: 'Home',
		components: {
			ToolBarNav,
		},
		data: () => ({
			tabs: [''],
		}),
		computed: {
			...mapState(['usuario']),
		},
		methods: {
			...mapActions(['comprobarToken', 'cargarUsuario']),
		},
		async created() {
			this.tabs = [
				{ link: '/', texto: 'link' },
				{ link: 'inicio', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
				{ link: '/', texto: 'link' },
			];
			await this.cargarUsuario();
			await this.comprobarToken();
		},
	});
</script>
