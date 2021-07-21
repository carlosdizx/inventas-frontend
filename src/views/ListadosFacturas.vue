<template>
	<v-container>
    <Factura></Factura>
	</v-container>
</template>

<script>
	import Factura from '../components/general/Factura';

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
