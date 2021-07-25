<template>
	<v-card>
		{{ codigo }}
		<input type="text" />
		<v-card-title>
			<h1 id="resultado" />
		</v-card-title>
		<v-card-text>
			<div id="camara" ></div>
		</v-card-text>
	</v-card>
</template>

<script>
	import Quagga from 'quagga';
	import Swal from 'sweetalert2';
	import Vue from 'vue';

	export default {
		name: 'LectorBarras',
		data: () => ({
			codigo: 'xd',
		}),
		methods: {
			cambiarCodigo(codigo) {
				console.log(codigo);
			},
		},
		async mounted() {
			Quagga.init(
				{
					inputStream: {
						name: 'Live',
						type: 'LiveStream',
						target: document.querySelector('#camara'),
					},
					decoder: {
						readers: ['code_128_reader'],
					},
				},
				function(err) {
					if (err) {
						console.log(err);
						return;
					}
					Quagga.start();
				}
			);
			Quagga.onDetected(function(data) {
				console.log(data.codeResult.code);
				document.querySelector('#resultado').innerText = data.codeResult.code;
				const codigo = document.querySelector('#resultado').innerHTML;
        window.Event = new Vue();
        Event.$emit('darCodigo');
				//this.cambiarCodigo(data.codeResult.code);
			});
			/**
	     await Quagga.onDetected(function(data) {
				Swal.fire({
					title: 'Codigo escaneado',
					html: `${data.codeResult.code}`,
					timer: 800,
					showConfirmButton: false,
				});
				this.codigo = data.codeResult.code;
				this.$emit('darCodigo', [data.codeResult.code]);
			});
	      */
		},
	};
</script>
