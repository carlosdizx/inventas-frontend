<template>
	<v-container>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<v-card>
				<v-card-title>Registro de clientes</v-card-title>
				<v-card-subtitle>Complete todos los campos</v-card-subtitle>
				<v-card-text>
					<v-form>
						<validation-provider
							v-slot="{ errors }"
							name="Nombre y apellidos"
							rules="required|min:5|max:60"
						>
							<v-text-field
								v-model="nombres"
								label="Nombres y apellidos"
								prepend-icon="mdi-account"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
						<validation-provider
							v-slot="{ errors }"
							name="Documento de identidad"
							rules="required|min:5|max:20"
						>
							<v-text-field
								v-model="documento"
								label="Documento de identidad"
								prepend-icon="mdi-card-account-details-outline"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
						<validation-provider
							v-slot="{ errors }"
							name="Celular"
							rules="required|min:5|max:20"
						>
							<v-text-field
								v-model="celular"
								label="Celular"
								type="number"
								prepend-icon="mdi-phone"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn block color="success">Registrar</v-btn>
				</v-card-actions>
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
		name: 'ClienteForm',
		components: { ValidationProvider, ValidationObserver },
		data: () => ({
			nombres: '',
			documento: '',
			celular: '',
		}),
	};
</script>

<style scoped></style>
