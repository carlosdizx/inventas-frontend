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
	import ToolBarNav from '../components/general/ToolBarNav';

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
				{ link: '/', texto: '1' },
				{ link: '/', texto: '2' },
				{ link: '/', texto: '3' },
				{ link: '/', texto: '4' },
				{ link: '/', texto: '5' },
				{ link: '/', texto: '9' },
				{ link: '/', texto: '10' },
				{ link: '/', texto: '11' },
				{ link: '/', texto: '12' },
				{ link: '/', texto: '13' },
			];
			await this.cargarUsuario();
			await this.comprobarToken();
		},
	});
</script>
