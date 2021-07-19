<template>
	<validation-observer ref="observer" v-slot="{ invalid }">
		<v-container v-if="!mostrar" color="red">
			No se puede registrar ventas<br />
			1. Agregue uno o mas productos <br />
			2. agregue almenos un cliete
		</v-container>
		<v-card v-if="mostrar">
			<v-card-title>Registro Factura/Venta</v-card-title>
			<v-card-subtitle>
				<v-form @submit.prevent="submit">
					<validation-provider
						v-slot="{ errors }"
						name="Documento de cliente"
						rules="required|min:5|max:20"
					>
						<v-text-field
							v-model.number="documento"
							label="Documento del cliente"
							append-icon="mdi-account-plus"
							type="number"
							required
							:error-messages="errors"
							counter
						/>
					</validation-provider>
					<v-spacer />
					<v-divider />
					<v-spacer />
					<v-row>
						<v-col cols="3">
							<v-text-field
								v-model.number="cantidad"
								label="Cantidad"
								type="number"
								counter
							/>
						</v-col>
						<v-col cols="9">
							<v-select
								v-model="productoSeleccionado"
								label="Producto"
								:items="productos"
								item-text="nombre"
							/>
						</v-col>
					</v-row>
					<v-btn @click="agregarAlCarrito">
						agregar producto
						<v-icon>mdi-cart-plus</v-icon>
					</v-btn>
				</v-form>
			</v-card-subtitle>
			<v-card-text>
				<v-text-field
					v-model.number="dinero"
					label="Calculadora rapida"
					prepend-icon="mdi-cash"
					type="number"
				/>
				<v-alert text color="indigo">
					Total <strong>${{ total }}</strong>
				</v-alert>
				<v-alert
					text
					:color="total - dinero > 0 ? 'red' : total - dinero < 0 ? 'green' : 'orange'"
				>
					Cambio <strong>${{ Math.abs(total - dinero) }}</strong>
				</v-alert>
				<v-btn block color="success" :disabled="invalid" @click="submit">
					Registrar venta
				</v-btn>
			</v-card-text>
		</v-card>
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
		name: 'FacturaForms',
		components: { ValidationProvider, ValidationObserver },
		data: () => ({
			documento: null,
			productos: [],
			cantidad: 1,
			productoSeleccionado: null,
			mostrar: false,
			comprados: [],
			total: 0,
			dinero: 0,
		}),
		methods: {
			...mapActions(['listarProductos']),
			submit() {},
			async cargarDatosProductos() {
				const respuesta = await this.listarProductos();
				if (typeof respuesta.data.Mensaje === 'string') {
					this.mostrar = false;
					return;
				}
				this.mostrar = true;
				this.productos = respuesta.data.Mensaje;
			},
			async agregarAlCarrito() {
				if (this.productoSeleccionado === null || this.cantidad <= 0) {
					return Swal.fire(
						'Producto',
						'Seleccione un producto y verifique la cantidad',
						'warning'
					);
				}
				await this.productos.forEach((producto) => {
					if (producto.nombre === this.productoSeleccionado) {
						return (this.total += producto.precioVenta * this.cantidad);
					}
				});
				this.cantidad = 1;
				this.productoSeleccionado = null;
			},
		},
		async mounted() {
			await this.cargarDatosProductos();
		},
	};
</script>
