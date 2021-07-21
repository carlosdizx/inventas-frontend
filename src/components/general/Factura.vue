<template>
	<div>
		<v-card class="mx-auto" max-width="700">
			<v-card-title>Listado de Facturas</v-card-title>
			<v-card-subtitle>
				<v-row>
					<v-col cols="5">
						<v-select
							v-model.number="id"
							label="Seleccione una factura"
							:items="facturas"
							item-text="id"
						/>
					</v-col>
					<v-col cols="6">
						<v-btn block :disabled="!id" color="success" @click="buscarFactura">
							Buscar factura
						</v-btn>
					</v-col>
				</v-row>
			</v-card-subtitle>
			<v-card v-if="id !== 0 && mostrar">
				<v-card-title>Factura #{{ seleccionada.id }}</v-card-title>
				<v-card-subtitle>
					Total <strong>{{ this.seleccionada.total | toUSD }}</strong>
					<br />
					Fecha de compra
					<strong>{{ this.seleccionada.fecha }}</strong>
					<br />
					Cliente:<strong> {{ this.seleccionada.descripcion }}</strong>
				</v-card-subtitle>
				<v-card-actions>
					<Tabla :columnas="columnas" :filas="Object.values(items)" />
				</v-card-actions>
			</v-card>
		</v-card>
	</div>
</template>

<script>
	import Tabla from './Tabla';
	import { mapActions } from 'vuex';
	import Swal from 'sweetalert2';
	export default {
		name: 'Factura',
		components: { Tabla },
		data: () => ({
			id: 0,
			seleccionada: {
				id: 0,
				fecha: '',
				descripcion: '',
				total: 0,
			},
			facturas: [],
			infoFacturas: [],
			columnas: [],
			mostrar: false,
			items: [],
		}),
		methods: {
			...mapActions(['listarFacturas', 'listarInfoFacturas']),
			async cargarFacturas() {
				const respuesta = await this.listarFacturas();
				if (typeof respuesta.data.Mensaje === 'string') {
					return;
				}
				this.facturas = respuesta.data.Mensaje;
			},
			async cargarInfoFacturas() {
				const respuesta = await this.listarInfoFacturas();
				if (typeof respuesta.data.Mensaje === 'string') {
					return;
				}
				this.infoFacturas = respuesta.data.Mensaje;
				this.columnas = Object.keys(this.infoFacturas[0]);
			},
			async buscarFactura() {
				this.items = [];
				this.seleccionada.total = 0;
				await this.infoFacturas.forEach((info) => {
					if (info.id === this.id) {
						this.items.push(info);
						this.seleccionada.total += info.subTotal;
					}
				});
				this.seleccionada.id = this.items[0].id;
				this.seleccionada.descripcion = this.items[0].descripcion;
				this.seleccionada.fecha = this.items[0].fecha;
				this.mostrar = true;
			},
		},
		async mounted() {
			try {
				await this.cargarFacturas();
				await this.cargarInfoFacturas();
			} catch (e) {
				await Swal.fire(
					'No se pudo obtener las facturas',
					'No se te concedio acceso',
					'warning'
				);
			}
		},
	};
</script>
