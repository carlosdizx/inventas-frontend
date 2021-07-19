<template>
	<v-container>
		<FacturaForms />
	</v-container>
</template>

<script>
	import FacturaForms from '../../components/forms/FacturaForms';
	export default {
		name: 'CajaRegistradora',
		components: {
			FacturaForms,
		},
	};
</script>

<style scoped></style>
