<template>
	<v-container>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<v-card>
				<v-card-title>Registro de producto o servicio</v-card-title>
				<v-card-subtitle>Complete todos los campos</v-card-subtitle>
				<v-card-text>
					<v-form>
						<validation-provider
							v-slot="{ errors }"
							name="Nombre"
							rules="required|min:5|max:20"
						>
							<v-text-field
								v-model="nombre"
								label="Nombre"
								prepend-icon="mdi-alphabetical"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
						<validation-provider
							v-slot="{ errors }"
							name="Precio de compra o produccion"
							rules="required"
						>
							<v-text-field
								v-model.number="compra"
								label="Precio de compra"
								prepend-icon="mdi-cash-multiple"
								type="number"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
						<validation-provider
							v-slot="{ errors }"
							name="Precio de venta"
							rules="required"
						>
							<v-text-field
								v-model.number="venta"
								label="Precio de venta"
								type="number"
								prepend-icon="mdi-cash-check"
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
		name: 'ProductoForm',
		components: { ValidationProvider, ValidationObserver },
		data: () => ({
			nombre: '',
			compra: null,
			venta: null,
		}),
	};
</script>
