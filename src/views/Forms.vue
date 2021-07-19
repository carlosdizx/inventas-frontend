<template>
	<div>
		<ToolBarListados :tabs="tabs" />
		<div>
			<v-btn block dark color="red" v-if="!showClientes">No hay clientes</v-btn>
			<Tabla v-if="showClientes" :columnas="columnas_clientes" :filas="clientes" />
		</div>
		<hr />
		<br />
		<div>
			<v-btn block dark color="red" v-if="!showProductos">No hay productos</v-btn>
			<Tabla v-if="showProductos" :columnas="columnas_productos" :filas="productos" />
		</div>
	</div>
</template>

<script>
	import ToolBarListados from '../components/listados/ToolBarListados';
	import Tabla from '../components/general/Tabla';
	import { mapActions } from 'vuex';
	export default {
		name: 'Forms',
		components: {
			ToolBarListados,
			Tabla,
		},
		data: () => ({
			tabs: ['mdi-archive', 'mdi-account-outline'],
			columnas_clientes: [],
			columnas_productos: [],
			clientes: [],
			productos: [],
			showClientes: false,
			showProductos: false,
		}),
		methods: {
			...mapActions(['listarClientes', 'listarProductos']),
			async cargarDatosClientes() {
				const respuesta = await this.listarClientes();
				if (typeof respuesta.data.Mensaje === 'string') {
					this.showClientes = false;
					return;
				}
				this.showClientes = true;
				this.clientes = respuesta.data.Mensaje;
				if (this.clientes.length > 0) {
					this.columnas_clientes = Object.keys(this.clientes[0]);
				}
			},
			async cargarDatosProductos() {
				const respuesta = await this.listarProductos();
				if (typeof respuesta.data.Mensaje === 'string') {
					this.showProductos = false;
					return;
				}
				this.showProductos = true;
				this.productos = respuesta.data.Mensaje;
				if (this.productos.length > 0) {
					this.columnas_productos = Object.keys(this.productos[0]);
				}
			},
		},
		async mounted() {
			await this.cargarDatosClientes();
			await this.cargarDatosProductos();
		},
	};
</script>

<style scoped></style>
