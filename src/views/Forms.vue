<template>
	<div>
		<ToolBarListados :tabs="tabs" />
		<Tabla :columnas="columnas_clientes" :filas="clientes" />
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
      clientes: [],
    }),
		methods: {
			...mapActions(['listarClientes']),
		},
		async mounted() {
			const respuesta = await this.listarClientes();
			this.clientes = respuesta.data.Mensaje;
			if(this.clientes.length > 0){
			  this.columnas_clientes = Object.keys(this.clientes[0]);
      }
			console.log(JSON.parse(JSON.stringify(this.clientes)));
		},
	};
</script>

<style scoped></style>
