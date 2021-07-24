<template>
	<v-container>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<v-card>
				<v-card-title>Registro inventario</v-card-title>
				<v-card-subtitle>Complete todos los campos</v-card-subtitle>
				<v-card-text>
					<v-form>
						<validation-provider v-slot="{ errors }" name="Nombre" rules="required">
							<v-select
								label="Seleccione un producto"
								prepend-icon="mdi-home"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
						<v-row>
							<v-col cols="8">
								<v-text-field prepend-icon="mdi-barcode" label="Codigo de barras" />
							</v-col>
							<br />
							<v-col cols="2">
								<v-btn block @click="display = !display">
									{{display?'Mostrar':'Ocultar'}}<v-icon>mdi-barcode-scan</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions> </v-card-actions>
			</v-card>
		</validation-observer>
	</v-container>
</template>

<script>
	import { required, digits, email, max, min } from 'vee-validate/dist/rules';
	import {
		extend,
		ValidationObserver,
		ValidationProvider,
		setInteractionMode,
	} from 'vee-validate';

	{
		setInteractionMode('eager');

		extend('digits', {
			...digits,
			message: '{_field_} Se necesita {length} digitos. ({_value_})',
		});

		extend('required', {
			...required,
			message: '{_field_} no puede estar vacio',
		});

		extend('max', {
			...max,
			message: '{_field_} {length} maximo de caracteres',
		});

		extend('min', {
			...min,
			message: '{_field_} => Ingrese mas caracteres, minimo {length} ',
		});

		extend('email', {
			...email,
			message: 'Correo con formato incorrecto',
		});
	}

	export default {
		name: 'InventarioForm',
		components: { ValidationProvider, ValidationObserver },
		data: () => ({
			display: false,
		}),
		methods: {},
	};
</script>

<style scoped></style>
