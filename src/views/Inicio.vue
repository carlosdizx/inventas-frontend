<template>
	<v-card>
		<ToolBarNav :tabs="tabs" />
		<v-container>
			<v-card>
				<v-card-text>
					<v-alert block dense dark color="orange">
						Bienvenido!!! <br />
						{{ usuario.info }} 👋
					</v-alert>
				</v-card-text>
				<v-alert>Utiliza los iconos de la parte superior para navegar  mas comodamemente</v-alert>
				<v-alert>En la seccion de abajo esta explicada para que sirve cada boton o icono</v-alert>
				<v-card-actions>
					<v-list>
						<v-divider />
						<router-link
							:to="tab.link"
							v-for="(tab, index) in tabs"
							v-slot="{ navigate }"
							custom
						>
							<v-list-item :key="index">
								<v-list-item-icon>
									<v-icon @click="navigate" color="primary">{{ tab.icono }}</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title @click="navigate">
										<v-alert>
											{{ tab.descripcion }}
										</v-alert>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</router-link>
					</v-list>
				</v-card-actions>
			</v-card>
		</v-container>
	</v-card>
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
				{ link: '/inicio', icono: 'mdi-home', descripcion: '📍 Estas en esta seccion' },
				{
					link: '/cajaregistradora',
					icono: 'mdi-cash-register',
					descripcion: 'Registrar una venta',
				},
				{
					link: '/listados',
					icono: 'mdi-clipboard-list-outline',
					descripcion: 'Listas de recursos',
				},
				{
					link: '/registro',
					icono: 'mdi-view-grid-plus',
					descripcion: 'Registrar recursos',
				},
				{
					link: '/facturas',
					icono: 'mdi-receipt',
					descripcion: 'Visualizar ventas en facturas',
				},
				{ link: '/inicio', icono: 'mdi-account-multiple', descripcion: 'Nada 🏗👷' },
				{
					link: '/inicio',
					icono: 'mdi-file-document',
					descripcion: 'Genera informes 🏗👷',
				},
				{
					link: '/inicio',
					icono: 'mdi-poll',
					descripcion: 'Graficas de resumen 🏗👷',
				},
			];
			await this.comprobarToken();
			this.usuario.authorities.forEach((authority) => {
				if (authority === 'ROLE_ADMIN') {
					return (this.admin = true);
				}
			});
		},
	});
</script>
