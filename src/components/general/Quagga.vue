<template>
	<v-quagga :onDetected="logIt" />
</template>

<script>
	import Vue from 'vue';
	import VueQuagga from 'vue-quaggajs';
	import Swal from 'sweetalert2';

	Vue.use(VueQuagga);

	export default {
		name: 'Quagga',
		data() {
			return {
				detecteds: [],
			};
		},
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
