<template>
	<v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="readerTypes" />
</template>

<script>
	import Vue from 'vue';
	import VueQuagga from 'vue-quaggajs';
	import Swal from 'sweetalert2';

	Vue.use(VueQuagga);

	export default {
		name: 'Quagga',
		data: () => ({
			readerSize: {
				width: 500,
				height: 480,
			},
			readerTypes: [
				'ean_reader',
				'code_128_reader',
				'ean_8_reader',
				'code_39_reader',
				'code_39_vin_reader',
				'codabar_reader',
				'upc_reader',
				'upc_e_reader',
				'2of5_reader',
				'i2of5_reader',
				'code_93_reader',
			],
		}),
		methods: {
			logIt(data) {
				setTimeout(async function() {
					await Swal.fire({
						title: 'Codigo escaneado',
						icon: 'success',
						timer: 1000,
					});
				}, 1000);
			},
		},
		mounted() {
			console.log('componente cargado');
		},
	};
</script>
