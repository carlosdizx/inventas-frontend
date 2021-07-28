<template>
	<div>
		<ToolBarNav :tabs="tabs" />
		<v-container>
			<v-card>
				<v-card-text>
					<v-alert dense dark color="primary">
						Bienvenido!!! <br />
						{{ usuario.info }}
						{{ usuario }}
					</v-alert>
				</v-card-text>
				<v-card-text>
					<v-alert>Utiliza los iconos de la parte superior para navegar</v-alert>
				</v-card-text>
				<v-card-actions>
					<h1>{{ admin }}</h1>
				</v-card-actions>
			</v-card>
		</v-container>
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
			admin: false,
		}),
		computed: {
			...mapState(['usuario', 'token']),
		},
		methods: {
			...mapActions(['comprobarToken']),
		},
		async created() {
			this.tabs = [
				{ link: '/inicio', icono: 'mdi-home', descripcion: 'Estas en esta seccion' },
				{
					link: '/cajaregistradora',
					icono: 'mdi-cash-register',
					descripcion: 'Para registrar una venta, genera una factura',
				},
				{ link: '/listados', icono: 'mdi-clipboard-list-outline', descripcion: '' },
				{
					link: '/registro',
					icono: 'mdi-view-grid-plus',
					descripcion: 'Registrar productos, clientes o inventarios',
				},
				{
					link: '/facturas',
					icono: 'mdi-receipt',
					descripcion: 'Visualiza las ventas en facturas',
				},
				{ link: '/inicio', icono: 'mdi-account-multiple', descripcion: 'Nada' },
				{ link: '/inicio', icono: 'mdi-file-document', descripcion: 'Genera informes' },
				{
					link: '/inicio',
					icono: 'mdi-poll',
					descripcion: 'Realiza graficas de resumen',
				},
			];
			await this.comprobarToken();
			const token = JSON.parse(this.token);
			const decodificado = JSON.parse(
				decodeURIComponent(escape(atob(token.access_token.split('.')[1])))
			);
			decodificado.authorities.forEach((authority) => {
				if (authority === 'ROLE_ADMIN') {
					this.admin = true;
				}
			});
		},
	});
</script>
