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
					<v-btn :disabled="invalid" block color="success" @click="registrarCliente">
						Registrar
					</v-btn>
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
	import { mapActions } from 'vuex';
	import Swal from 'sweetalert2';

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
		async created() {
			await this.comprobarToken();
		},
		methods: {
			...mapActions(['comprobarToken', 'agregarCliente']),
			async registrarCliente() {
				const cliente = {
					nombres: this.nombres,
					documento: this.documento,
					celular: this.celular,
				};
				try {
					const respuesta = await this.agregarCliente(cliente);
					if (typeof respuesta.data.Mensaje === 'string') {
						return await Swal.fire('Alerta', `${respuesta.data.Mensaje}`, 'info');
					}
					this.nombres = '';
					this.documento = '';
					this.celular = '';
					return await Swal.fire(
						'Registro exitoso',
						'Se registro el cliente 👌😎',
						'success'
					);
				} catch (e) {
					await Swal.fire(
						'Error',
						`Asegurarte que el cliente no este registrado
                <br/> documento de identidad unico para cada cliete
                <br/>
                ${e.message}`,
						'error'
					);
				}
			},
		},
	};
</script>

<style scoped></style>
