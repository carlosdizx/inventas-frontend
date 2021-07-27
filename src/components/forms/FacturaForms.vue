<template>
	<div>
		<v-card>
			<v-toolbar color="green" dark flat>
				<v-app-bar-nav-icon>
					<router-link to="/inicio" v-slot="{ navigate }" custom>
						<v-btn @click="navigate" role="link" icon>
							<v-icon>mdi-arrow-left-thin-circle-outline</v-icon>
						</v-btn>
					</router-link>
				</v-app-bar-nav-icon>
				<v-toolbar-title>Registre una factura de venta</v-toolbar-title>
			</v-toolbar>
		</v-card>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<v-container v-if="!mostrar" color="red">
				No se puede registrar ventas<br />
				1. Agregue uno o mas productos/servicios <br />
				2. Agregue esos prodcutos/servicios al inventario
			</v-container>
			<v-card v-if="mostrar">
				<v-card-title>Complete los campos</v-card-title>
				<v-card-subtitle>
					<v-form>
						<validation-provider
							v-slot="{ errors }"
							name="Documento"
							rules="required|min:5|max:20"
						>
							<v-text-field
								v-model="documento"
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
								<v-text-field
									v-model="codigoProducto"
									type="number"
									label="Codigo del producto"
									prepend-icon="mdi-barcode-scan"
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
	</div>
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
			codigoProducto: null,
			mostrar: false,
			comprados: [],
			agregados: [],
			items: [],
			activos: [],
			total: 0,
			dinero: 0,
			columnas: ['Producto', 'Precio', 'Cantidad', 'Subtotal'],
		}),
		methods: {
			...mapActions([
				'listarProductos',
				'listarClientes',
				'listarActivos',
				'agregarFactura',
				'comprobarToken',
			]),
			async registrarFactura() {
				this.productos.forEach((producto) => {
					this.comprados.forEach((comprado) => {
						if (comprado.producto === producto.nombre) {
							this.items.push({ producto: producto, cantidad: comprado.cantidad });
						}
					});
				});
				const factura = {
					descripcion: this.documento.toString().toUpperCase(),
					items: this.items,
				};
				const respuesta = await this.agregarFactura(factura);
				if (typeof respuesta.data.Mensaje === 'string') {
					return Swal.fire('Advertencia', `${respuesta.data.Mensaje}`, 'warning');
				}
				this.cantidad = 1;
				this.codigoProducto = null;
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
			async cargarActivosDeInventarios() {
				const respuesta = await this.listarActivos();
				if (typeof respuesta.data.Mensaje === 'string') {
					return (this.mostrar = false);
				}
				this.mostrar = true;
				this.activos = JSON.parse(JSON.stringify(respuesta.data.Mensaje));
			},
			async composCorrectos() {
				return this.codigoProducto === null || this.codigoProducto === ''
					? Swal.fire(
							'Codigo de barras',
							'Escane o escirba el codigo de barras de un producto registrado en el inventario',
							'warning'
					  )
					: true;
			},
			async codigoRepetido() {
				let preRegistrado = false;
				this.agregados.forEach((agregado) => {
					if (agregado.codigo === parseInt(this.codigoProducto)) {
						return (preRegistrado = true);
					}
				});
				if (preRegistrado) {
					await Swal.fire(
						'Repetido',
						'Codigo del producto ya se encuentra registrado en la factura',
						'warning'
					);
				}
				return !preRegistrado;
			},
			existeCodigo() {
				let existe = false;
				this.activos.forEach((activo) => {
					if (activo.codigo === parseInt(this.codigoProducto)) {
						existe = true;
					}
				});
				if (!existe) {
					Swal.fire(
						'No agregado',
						`Codigo no esta registrado en el inventario<br>
	                   Codigo ingresado: ${this.codigoProducto}`,
						'error'
					);
				}
				return existe;
			},
			async agregarAlCarrito() {
				if (await this.composCorrectos()) {
					if (await this.codigoRepetido()) {
						if (this.existeCodigo()) {
							let existe = false;
							await this.activos.forEach((activo) => {
								if (activo.codigo === parseInt(this.codigoProducto)) {
									this.agregados.push({
										codigo: activo.codigo,
										producto: activo.producto,
									});
								}
							});
							const producto = this.agregados[this.agregados.length - 1].producto;
							this.comprados.forEach((comprado) => {
								if (comprado.producto === producto.nombre) {
									return (existe = true);
								}
							});
							if (existe) {
								this.comprados.forEach((comprado) => {
									if (comprado.producto === producto.nombre) {
										comprado.cantidad += 1;
										comprado.subTotal = comprado.cantidad * comprado.precio;
									}
								});
							} else {
								this.comprados.push({
									producto: producto.nombre,
									precio: producto.precioVenta,
									cantidad: 1,
									subTotal: producto.precioVenta,
								});
							}
							await Swal.fire({
								title: 'Agreado',
								icon: 'success',
								timer: 780,
							});
							this.total = 0;
							this.comprados.forEach((comprado) => {
								this.total += comprado.subTotal;
							});
						}
					}
				}
			},
		},
		async mounted() {
			try {
				await this.comprobarToken();
				await this.cargarDatosProductos();
				await this.cargarActivosDeInventarios();
			} catch (e) {}
		},
	};
</script>
