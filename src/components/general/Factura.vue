<template>
	<v-container>
		<v-card class="ticket">
			<v-card-title>Factura #{{ this.facturasSeleccionada[0].id }}</v-card-title>
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
</template>

<script>
	import Tabla from './Tabla';
	export default {
		name: 'Factura',
		components: { Tabla },
		data: () => ({
			id: 0,
			fecha: '',
			documento: '',
			total: 0,
			columnas: [],
		}),
		props: {
			facturasSeleccionada: Array(),
		},
		methods: {
			actulizarInfo() {
				if (this.facturasSeleccionada.length > 0) {
					this.columnas = Object.keys(this.facturasSeleccionada[0]);
					this.id = this.facturasSeleccionada[0].id;
					this.fecha = this.facturasSeleccionada[0].fecha;
					this.documento = this.facturasSeleccionada[0].descripcion;
					this.total = 0;
					this.facturasSeleccionada.forEach((valor) => {
						this.total += valor.subTotal;
					});
				}
			},
		},
		async mounted() {
			this.actulizarInfo();
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
