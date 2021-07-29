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
							rules="required|min:5|max:100"
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
								label="Precio de compra o produccion"
								prepend-icon="mdi-cash-multiple"
								type="number"
								required
								:error-messages="errors"
								counter
							/>
							<v-alert>{{ compra | toUSD }}</v-alert>
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
              <v-alert>{{ venta | toUSD }}</v-alert>
						</validation-provider>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn :disabled="invalid" block color="success" @click="registrarProducto">
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
		name: 'ProductoForm',
		components: { ValidationProvider, ValidationObserver },
		data: () => ({
			nombre: '',
			compra: null,
			venta: null,
		}),
		methods: {
			...mapActions(['comprobarToken', 'agregarProducto']),
			async registrarProducto() {
				if (this.precioCompra >= this.precioVenta) {
					return await Swal.fire(
						'El precio de compra/produccion debe ser mayor al precio de venta'
					);
				} else {
					const producto = {
						nombre: this.nombre,
						precioCompra: this.compra,
						precioVenta: this.venta,
					};
					try {
						const respuesta = await this.agregarProducto(producto);
						if (typeof respuesta.data.Mensaje === 'string') {
							return await Swal.fire('Alerta', `${respuesta.data.Mensaje}`, 'info');
						}
						this.nombre = '';
						this.compra = null;
						this.venta = null;
						return await Swal.fire(
							'Registro exitoso',
							'Se registro el producto 👌😎',
							'success'
						);
					} catch (e) {
						await Swal.fire(
							'Error',
							`Asegurarte de que el producto/servicio no este registrado
                <br/> el nombre debe ser unico
                <br/>
                ${e.message}`,
							'error'
						);
					}
				}
			},
		},
		async created() {
			try {
				await this.comprobarToken();
			} catch (e) {
				console.log('No se pudo comprobar el token');
			}
		},
	};
</script>
