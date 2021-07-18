<template>
	<div>
		<ToolBarForms :tabs="tabs" />
		<Tabla :columnas="columnas" :filas="filas" />
	</div>
</template>

<script>
	import ToolBarForms from '../components/forms/ToolBarForms';
	import Tabla from '../components/general/Tabla';
	export default {
		name: 'Forms',
		components: {
			ToolBarForms,
			Tabla,
		},
		data: () => ({
			tabs: ['mdi-archive', 'mdi-account-outline'],
			columnas: ['id', 'nombres', 'apellidos', 'celular', 'correo'],
			filas: [
				{
					id: 1,
					nombres: 'Carlos Ernesto',
					apellidos: 'Díaz Basante',
					celular: 3163930876,
					correo: 'carlodiaz@umariana.edu.co',
				},
			],
		}),
	};
</script>

<style scoped></style>
