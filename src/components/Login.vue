<template>
	<validation-observer ref="observer" v-slot="{ invalid }">
		<v-app class="mt-12">
			<v-card class="mt-5 mx-auto">
				<v-card-title>
					<img
						src="../assets/logo.png"
						height="200"
						width="245"
						alt="logo"
						class="mx-auto"
					/>
				</v-card-title>
				<v-card-text>
					<v-form @submit.prevent="submit">
						<validation-provider v-slot="{ errors }" name="email" rules="required">
							<v-text-field
								v-model="userTemplate.username"
								:error-messages="errors"
								label="Nombre de usuario"
								prepend-icon="mdi-account-circle"
								required
							>
							</v-text-field>
						</validation-provider>
						<validation-provider
							v-slot="{ errors }"
							name="Contraseña"
							rules="required|min:8|max:60"
						>
							<v-text-field
								v-model="userTemplate.password"
								type="password"
								label="Contraseña"
								:error-messages="errors"
								name="input-10-1"
								counter
								prepend-icon="mdi-lock"
								:type="showPassword ? 'text' : 'password'"
								:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPassword = !showPassword"
							>
							</v-text-field>
						</validation-provider>
					</v-form>
					<v-card-actions>
						<v-btn
							block
							@click="submit"
							role="link"
							color="info"
							type="submit"
							:disabled="invalid"
							>Iniciar sesion
						</v-btn>
					</v-card-actions>
				</v-card-text>
			</v-card>
		</v-app>
	</validation-observer>
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

	export default {
		components: {
			ValidationProvider,
			ValidationObserver,
		},
		name: 'Login',
		data: () => ({
			userTemplate: {
				username: '',
				password: '',
			},
			showPassword: false,
		}),
		methods: {
			...mapActions(['loguearUsuario', 'cargarDatos']),
			async submit() {
				await this.loguearUsuario(this.userTemplate);
			},
		},
	};
</script>

<style scoped>
	.v-btn {
		text-decoration: none !important;
	}
</style>
