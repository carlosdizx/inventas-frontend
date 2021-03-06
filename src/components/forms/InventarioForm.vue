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
								v-model="producto"
								label="Seleccione un producto"
								prepend-icon="mdi-view-grid-plus-outline"
								:items="productos"
								item-text="nombre"
								required
								:error-messages="errors"
								counter
							/>
						</validation-provider>
						<v-text-field
							v-model="codigo"
							label="Codigo de barras"
							color="success"
							prepend-icon="mdi-barcode-scan"
							v-on:keyup.13="agregarActivo()"
						/>
						<v-btn :disabled="codigo === '' || producto === ''" @click="agregarActivo">
							<v-icon>mdi-shape-plus</v-icon>
							Agregar codigo
						</v-btn>
						<br />
						<br />
						<v-btn
							@click="registrarInvetario"
							:disabled="activos.length === 0"
							color="success"
						>
							Registrar inventario
						</v-btn>
						<br />
						<br />
					</v-form>
				</v-card-text>
				<v-card-actions>
					<Tabla :columnas="columnas" :filas="items" />
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
	import Quagga from '../general/Quagga';
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
		name: 'InventarioForm',
		components: { ValidationProvider, ValidationObserver, Quagga, Tabla },
		data: () => ({
			display: false,
			codigo: '',
			producto: '',
			productos: [],
			items: [],
			activos: [],
			columnas: ['Producto', 'Codigo de barras'],
		}),
		methods: {
			...mapActions(['comprobarToken', 'listarProductos', 'agregarInventarios']),
			async agregarActivo() {
				if (this.codigo === '' || this.producto === '') {
					return Swal.fire('Error', 'Complete todos los campos', 'error');
				} else {
					let agregar = true;
					this.items.forEach((item) => {
						if (item.codigo === this.codigo) {
							agregar = false;
						}
					});
					if (agregar) {
						await this.items.push({ producto: this.producto, codigo: this.codigo });
						const seleccionados = await this.items[this.items.length - 1];
						this.productos.forEach((producto) => {
							if (producto.nombre === seleccionados.producto) {
								return this.activos.push({
									producto: producto,
									codigo: seleccionados.codigo,
								});
							}
						});
						return (this.codigo = '');
					}
					await Swal.fire(
						'Error',
						'Codigo de barras repetido, ya esta agregado',
						'warning'
					);
				}
			},
			async registrarInvetario() {
				try {
					const activos = { activos: this.activos };
					const respuesta = await this.agregarInventarios(activos);
					if (typeof respuesta.data.Mensaje === 'string') {
						return await Swal.fire('Alerta', `${respuesta.data.Mensaje}`, 'info');
					}
					this.display = false;
					this.codigo = '';
					this.producto = '';
					this.items = [];
					this.activos = [];
					return await Swal.fire(
						'Registro exitoso!',
						`Se registro el inventario correctamente<br>
                Inventario #${respuesta.data.Mensaje.id}`,
						'success'
					);
				} catch (e) {
					await Swal.fire('Alerta', `No se pudo agregar el invetario`, 'info');
					console.log(e);
				}
			},
		},
		async created() {
			try {
				await this.comprobarToken();
			} catch (e) {
				console.log('No se pudo comprobar el token');
				console.log(e);
			}
		},
		async mounted() {
			try {
				const respuesta = await this.listarProductos();
				if (typeof respuesta.data.Mensaje === 'string') {
					return await Swal.fire('Alerta', `${respuesta.data.Mensaje}`, 'info');
				}
				this.productos = respuesta.data.Mensaje;
			} catch (e) {
				console.log('No se pudo cargar los productos');
				console.log(e);
			}
		},
	};
</script>
