<template>
  <div>
    <ProductoForm />
    <ClienteForm />
  </div>
</template>

<script>
	import ProductoForm from '../../components/forms/ProductoForm';
	import ClienteForm from '../../components/forms/ClienteForm';
	export default {
		name: 'Registro',
		components: {
			ProductoForm,ClienteForm
		},
	};
</script>

<style scoped></style>
