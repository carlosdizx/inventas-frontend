<template>
	<div>
		<v-card>
			<v-toolbar color="indigo" dark flat>
				<v-app-bar-nav-icon>
					<router-link to="/inicio" v-slot="{ navigate }" custom>
						<v-btn @click="navigate" role="link" icon>
							<v-icon>mdi-arrow-left-thin-circle-outline</v-icon>
						</v-btn>
					</router-link>
				</v-app-bar-nav-icon>
				<v-toolbar-title>Listados</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon>mdi-{{ icono }}</v-icon>
			</v-toolbar>
			<v-tabs
				background-color="indigo"
				center-active
				dark
				next-icon="mdi-arrow-right-bold-circle-outline"
				prev-icon="mdi-arrow-left-bold-circle-outline"
				show-arrows
			>
				<v-tabs-slider color="red"></v-tabs-slider>
				<v-tab v-for="(tab, index) in tabs" :key="index" @click="cambiarIndex(index + 1)">
					<v-icon>{{ tab }}</v-icon>
				</v-tab>
			</v-tabs>
			<v-btn disabled text>
				{{ indice === 1 ? 'Clientes' : 'Productos/Servicios' }}
			</v-btn>
		</v-card>
		<div v-if="indice === 1">
			<v-btn block dark color="red" v-if="!showClientes" role="alert"
				>No hay clientes</v-btn
			>
			<Tabla v-if="showClientes" :columnas="columnas_clientes" :filas="clientes" />
		</div>
		<div v-if="indice === 2">
			<v-btn block dark color="red" v-if="!showProductos" role="alert"
				>No hay productos o no tienes acceso</v-btn
			>
			<Tabla v-if="showProductos" :columnas="columnas_productos" :filas="productos" />
		</div>
	</div>
</template>

<script>
	import Tabla from '../general/Tabla';
	import { mapActions } from 'vuex';
	import Swal from 'sweetalert2';

	export default {
		name: 'ToolBarListados',
		components: {
			Tabla,
		},
		data: () => ({
			tabs: ['mdi-account-outline', 'mdi-archive'],
			columnas_clientes: [],
			columnas_productos: [],
			clientes: [],
			productos: [],
			showClientes: false,
			showProductos: false,
			indice: 1,
			icono: 'clipboard-list-outline',
		}),
		methods: {
			...mapActions(['listarClientes', 'listarProductos', 'comprobarToken']),
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
				try {
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
				} catch (onerror) {
          console.log('El usuario no tiene accesos al listado productos')
				}
			},
			cambiarIndex(index) {
				this.indice = index;
			},
		},
		async mounted() {
			await this.comprobarToken();
			await this.cargarDatosClientes();
			await this.cargarDatosProductos();
		},
	};
</script>
