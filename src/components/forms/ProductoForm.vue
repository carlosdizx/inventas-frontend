<template>
	<div>
		<v-container>
			<v-card>
				<v-card-title>Registro de producto o servicio</v-card-title>
				<v-card-subtitle>Complete todos los campos</v-card-subtitle>
				<v-card-text>
					<v-form>
						<v-text-field label="Nombre" prepend-icon="mdi-alphabetical" counter />
						<v-text-field
							label="Precio de compra"
							prepend-icon="mdi-cash-multiple"
							counter
							type="number"
						/>
						<v-text-field
							label="Precio de venta"
							type="number"
							prepend-icon="mdi-cash-check"
							counter
						/>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn block color="success">Registrar</v-btn>
				</v-card-actions>
			</v-card>
		</v-container>
	</div>
</template>

<script>
	export default {
		name: 'ProductoForm',
	};
</script>
