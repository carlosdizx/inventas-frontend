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
				<v-card-title>Factura #{{ idSeleccionado }}</v-card-title>
			</v-card>
		</v-card>
		<!--
		<v-container>
			<v-card class="ticket" v-if="idSeleccionado !== null">
				<v-card-title>Factura #{{ idSeleccionado }}</v-card-title>
				<v-card-subtitle>
					Total <strong>{{ total | toUSD }}</strong>
					<br />
					Fecha
					<strong>{{ this.facturasSeleccionada[0].fecha }}</strong>
					<br />
					Cliente:<strong> {{ documento }}</strong>
				</v-card-subtitle>
				<v-card-text>
					<Tabla :columnas="columnas" :filas="Object.values(facturasSeleccionada)" />
				</v-card-text>
				<v-card-actions> </v-card-actions>
			</v-card>
		</v-container>
		-->
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
			idSeleccionado: 0,
			fecha: '',
			documento: '',
			total: 0,
			facturas: [],
			infoFacturas: [],
			columnas: [],
			mostrar: false,
			items: [],
		}),
		methods: {
			...mapActions(['listarFacturas', 'listarInfoFacturas']),
			actulizarInfo() {
				if (this.items.length > 0) {
					this.columnas = Object.keys(this.items[0]);
					this.id = this.items[0].id;
					this.fecha = this.items[0].fecha;
					this.documento = this.items[0].descripcion;
					this.total = 0;
					this.items.forEach((valor) => {
						this.total += valor.subTotal;
					});
				}
			},
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
				this.idSeleccionado = this.id;
				this.items = [];
				await this.infoFacturas.forEach((info) => {
					if (info.id === this.id) {
						this.items.push(info);
					}
				});
				this.mostrar = true;
			},
		},
		async mounted() {
			try {
				await this.cargarFacturas();
				await this.cargarInfoFacturas();
				this.actulizarInfo();
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

<style scoped>
	.ticket {
		background: radial-gradient(circle at 90% 10%, transparent 10px, #aee0e5 0);
	}
	.ticket {
		background: radial-gradient(circle at right top, transparent 10px, #aee0e5 0) top left /
				40% 51% no-repeat,
			radial-gradient(circle at right bottom, transparent 10px, #aee0e5 0) bottom left /
				40% 51% no-repeat,
			radial-gradient(circle at left top, transparent 10px, #eeeeee 0) top right / 100%
				51% no-repeat,
			radial-gradient(circle at left bottom, transparent 10px, #eeeeee 0) bottom right /
				100% 51% no-repeat;
	}
</style>
