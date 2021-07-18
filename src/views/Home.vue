<template>
	<div>
		<ToolBarNav :tabs="tabs" />
		<router-link to="inicio" v-slot="{ navigate }" custom>
			<v-btn block @click="navigate">Login</v-btn>
		</router-link>
		<router-link to="registro" v-slot="{ navigate }" custom>
			<v-btn block @click="navigate">Registro</v-btn>
		</router-link>
		<hr />
		<hr />
		{{ usuario }}
		<hr />
		<hr />
		{{ token }}
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
			...mapState(['usuario', 'token']),
		},
		methods: {
			...mapActions(['comprobarToken']),
		},
		async created() {
			this.tabs = [
				{ link: '/', icono: 'mdi-home' },
				{ link: '/', icono: 'mdi-cash-register' },
				{ link: '/', icono: 'mdi-food-variant' },
				{ link: '/', icono: 'mdi-account-multiple' },
				{ link: '/', icono: 'mdi-receipt' },
				{ link: '/', icono: 'mdi-file-document' },
				{ link: '/', icono: 'mdi-poll' },
			];
			await this.comprobarToken();
		},
	});
</script>
