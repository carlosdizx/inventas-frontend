<template>
	<v-container>
		<v-card>
			<v-card-title>Factura #{{ id }}</v-card-title>
			<v-card-subtitle>
				Total <strong>{{ total | toUSD }}</strong>
			</v-card-subtitle>
			<Tabla columnas=""/>
		</v-card>
	</v-container>
</template>

<script>
	import Tabla from './Tabla';
	export default {
		name: 'Factura',
		components: {Tabla},
		props: {
			id: String,
			total: null,
		},
	};
</script>

<style scoped></style>
