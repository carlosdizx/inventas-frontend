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
				<v-form>
					<validation-provider
						v-slot="{ errors }"
						name="Descripcion"
						rules="required|min:5|max:20"
					>
						<v-text-field
							v-model.number="documento"
							type="number"
							label="Documento del cliente"
							prepend-icon="mdi-account-plus"
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
				<v-row>
					<v-col cols="6">
						<v-text-field
							v-model.number="dinero"
							label="Calculadora rapida"
							prepend-icon="mdi-cash"
							type="number"
						/>
					</v-col>
					<v-col cols="6">
						<v-alert dense text color="indigo">
							<strong>{{ dinero | toUSD }}</strong>
						</v-alert>
					</v-col>
				</v-row>
				<v-alert text color="success">
					Total <strong>{{ total | toUSD }}</strong>
				</v-alert>
				<v-alert
					text
					:color="total - dinero > 0 ? 'red' : total - dinero < 0 ? 'green' : 'orange'"
				>
					Cambio
					<strong>{{ Math.abs(total - dinero) | toUSD }}</strong>
				</v-alert>
				<v-btn
					block
					color="success"
					:disabled="invalid || comprados.length === 0"
					@click="registrarFactura"
				>
					Registrar venta
				</v-btn>
				<Tabla :columnas="columnas" :filas="comprados" />
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
	import Tabla from '../general/Tabla';
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
		components: { ValidationProvider, ValidationObserver, Tabla },
		data: () => ({
			documento: null,
			productos: [],
			cantidad: 1,
			productoSeleccionado: null,
			mostrar: false,
			comprados: [],
			items: [],
			total: 0,
			dinero: 0,
			columnas: ['Producto', 'Precio', 'Cantidad', 'Subtotal'],
		}),
		methods: {
			...mapActions([
				'listarProductos',
				'listarClientes',
				'listarFacturas',
				'agregarFactura',
				'comprobarToken',
			]),
			async registrarFactura() {
				const factura = { descripcion: this.documento.toString(), items: this.items };
				const respuesta = await this.agregarFactura(factura);
				if (typeof respuesta.data.Mensaje === 'string') {
					return Swal.fire('Advertencia', `${respuesta.data.Mensaje}`, 'warning');
				}
				this.cantidad = 1;
				this.productoSeleccionado = null;
				this.items = [];
				this.comprados = [];
				this.total = 0;
				this.dinero = 0;
				this.documento = null;
				await Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Factura registrada 😎👍',
					showConfirmButton: false,
					timer: 1500,
				});
			},
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
						let registrado = false;
						this.comprados.forEach((comprado, index) => {
							if (comprado.producto === this.productoSeleccionado) {
								comprado.cantiad += this.cantidad;
								comprado.subTotal += comprado.precio * this.cantidad;
								return (registrado = true);
							}
						});
						if (!registrado) {
							const subTotal = producto.precioVenta * this.cantidad;
							this.comprados.push({
								producto: producto.nombre,
								precio: producto.precioVenta,
								cantiad: this.cantidad,
								subTotal: subTotal,
							});
							return this.items.push({ producto: producto, cantidad: this.cantidad });
						}
					}
				});
				this.total = 0;
				this.comprados.forEach((comprado) => {
					this.total += comprado.precio * comprado.cantiad;
				});
				this.cantidad = 1;
				this.productoSeleccionado = null;
			},
		},
		async mounted() {
			await this.comprobarToken();
			await this.cargarDatosProductos();
		},
	};
</script>
