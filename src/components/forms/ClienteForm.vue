<template>
	<v-container>
		<v-card>
			<v-card-title>Registro de clientes</v-card-title>
			<v-card-subtitle>Complete todos los campos</v-card-subtitle>
			<v-card-text>
				<v-form>
					<v-text-field label="Nombres y apellidos" prepend-icon="mdi-account" counter />
					<v-text-field label="Documento de identidad" prepend-icon="mdi-card-account-details-outline" counter />
					<v-text-field label="Celular" type="number" prepend-icon="mdi-phone" counter />
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn block color="success">Registrar</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		name: 'ClienteForm',
	};
</script>

<style scoped></style>
