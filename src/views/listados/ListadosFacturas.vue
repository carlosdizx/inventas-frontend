<template>
	<v-container>
		<v-card class="mx-auto" max-width="600">
			<v-toolbar color="orange" dark flat>
				<v-app-bar-nav-icon>
					<router-link to="/inicio" v-slot="{ navigate }" custom>
						<v-btn @click="navigate" role="link" icon>
							<v-icon>mdi-arrow-left-thin-circle-outline</v-icon>
						</v-btn>
					</router-link>
				</v-app-bar-nav-icon>
				<v-toolbar-title>Listado de facturas</v-toolbar-title>
			</v-toolbar>
		</v-card>
		<Factura />
	</v-container>
</template>

<script>
	import Factura from '../../components/general/Factura';

	export default {
		name: 'ListadosFacturas',
		components: { Factura },
		data: () => ({
			facturas: [],
			infoFacturas: [],
			columnas: [],
			mostrar: false,
			idSeleccionado: null,
			facturasSeleccionada: [],
			buscado: false,
		}),
	};
</script>

<style scoped>
</style>
