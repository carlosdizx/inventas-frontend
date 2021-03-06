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
				{{
					indice === 1
						? 'Clientes'
						: indice === 2
						? 'Productos/Servicios'
						: indice === 3
						? 'Inventario'
						: 'Activos/Inventario detallado'
				}}
			</v-btn>
		</v-card>
		<div v-if="indice === 1">
			<v-btn block dark color="red" v-if="!showClientes" role="alert">
				No hay clientes
			</v-btn>
			<Tabla v-if="showClientes" :columnas="columnas_clientes" :filas="clientes" />
		</div>
		<div v-if="indice === 2">
			<v-btn block dark color="red" v-if="!showProductos" role="alert">
				No hay productos o no tienes acceso
			</v-btn>
			<Tabla v-if="showProductos" :columnas="columnas_productos" :filas="productos" />
		</div>
		<div v-if="indice === 3">
			<v-btn block dark color="red" v-if="!showInventarios" role="alert">
				No hay inventarios o no tienes acceso
			</v-btn>
			<Tabla
				v-if="showInventarios"
				:columnas="columnas_inventarios"
				:filas="inventarios"
			/>
		</div>
		<div v-if="indice === 4">
			<v-btn block dark color="red" v-if="!showActivos" role="alert">
				No hay activos o no tienes acceso
			</v-btn>
			<Tabla v-if="showActivos" :columnas="columnas_activos" :filas="activos" />
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
			tabs: ['mdi-account-outline', 'mdi-archive', 'mdi-warehouse', 'mdi-checkbox-marked-outline'],
			columnas_clientes: [],
			columnas_productos: [],
			columnas_inventarios: [],
			columnas_activos: [],
			clientes: [],
			productos: [],
			inventarios: [],
			activos: [],
			showClientes: false,
			showProductos: false,
			showInventarios: false,
			showActivos: false,
			indice: 1,
			icono: 'clipboard-list-outline',
		}),
		methods: {
			...mapActions([
				'listarClientes',
				'listarProductos',
				'listarInventarios',
				'comprobarToken',
			]),
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
			async cargarDatosInventario() {
				const respuesta = await this.listarInventarios();
				if (typeof respuesta.data.Mensaje === 'string') {
					this.showInventarios = false;
					return;
				}
				this.showInventarios = true;
				this.inventarios = respuesta.data.Mensaje;
				this.inventarios.forEach((inventario) => {
					let cantidad = 0;
					inventario.activos.forEach((activo) => {
						if (activo.estado) {
							cantidad++;
						}
					});
					inventario.total = inventario.activos.length;
					inventario.activos = cantidad;
					inventario.vendidos = inventario.total - cantidad;
				});
				this.columnas_inventarios = Object.keys(this.inventarios[0]);
			},
			async cargarDatosActivos() {
				const respuesta = await this.listarInventarios();
				if (typeof respuesta.data.Mensaje === 'string') {
					return (this.showInventarios = false);
				}
				this.showActivos = true;
				const inventariosTemp = respuesta.data.Mensaje;
				inventariosTemp.forEach((i) => {
					const activosTemp = i.activos;
					activosTemp.forEach((a) => {
						this.activos.push({
							no_inventario: i.id,
							codigo: a.codigo,
							estado: a.estado ? 'Disponible' : 'Vendido',
							producto: a.producto.nombre,
						});
					});
				});
				this.columnas_activos = Object.keys(this.activos[0]);
			},
			cambiarIndex(index) {
				this.indice = index;
			},
		},
		async mounted() {
			try {
				await this.comprobarToken();
				await this.cargarDatosClientes();
				await this.cargarDatosProductos();
				await this.cargarDatosInventario();
				await this.cargarDatosActivos();
			} catch (e) {
				console.log('El usuario no tiene acceso alguno de los recursos');
				console.log(e);
			}
		},
	};
</script>
