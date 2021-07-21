<template>
	<v-container>
		<v-card class="mx-auto" max-width="700">
			<v-card-title>Listado de Facturas</v-card-title>
			<div v-if="!mostrar">No hay facturas</div>
			<v-card-subtitle>
				<v-row>
					<v-col cols="6">
						<v-select
							v-model.number="idSeleccionado"
							label="Seleccione una factura"
							:items="facturas"
							item-text="id"
						/>
					</v-col>
					<v-col>
						<v-btn :disabled="!idSeleccionado" color="success" @click="buscarFactura">
							Buscar
						</v-btn>
					</v-col>
				</v-row>
			</v-card-subtitle>
			<div v-if="mostrar && buscado">
				<Factura :facturas-seleccionada="facturasSeleccionada" />
			</div>
		</v-card>
	</v-container>
</template>

<script>
	import { mapActions } from 'vuex';
	import Swal from 'sweetalert2';
	import Tabla from '../components/general/Tabla';
	import Factura from '../components/general/Factura';

	export default {
		name: 'ListadosFacturas',
		components: { Factura, Tabla },
		data: () => ({
			facturas: [],
			infoFacturas: [],
			columnas: [],
			mostrar: false,
			idSeleccionado: null,
			facturasSeleccionada: [],
			buscado: false,
		}),
		methods: {
			...mapActions(['listarFacturas', 'listarInfoFacturas']),
			async cargarFacturas() {
				const respuesta = await this.listarFacturas();
				if (typeof respuesta.data.Mensaje === 'string') {
					return (this.mostrar = false);
				}
				this.facturas = respuesta.data.Mensaje;
			},
			async cargarInfoFacturas() {
				const respuesta = await this.listarInfoFacturas();
				if (typeof respuesta.data.Mensaje === 'string') {
					return (this.mostrar = false);
				}
				this.infoFacturas = respuesta.data.Mensaje;
				this.columnas = Object.keys(this.infoFacturas[0]);
				this.mostrar = true;
			},
			async buscarFactura() {
				this.facturasSeleccionada = [];
				await this.infoFacturas.forEach((info) => {
					if (info.id === this.idSeleccionado) {
						this.facturasSeleccionada.push(info);
					}
				});
				this.buscado = true;
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

<style scoped></style>
