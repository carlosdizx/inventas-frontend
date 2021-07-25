<template>
		<v-quagga
			:onDetected="logIt"
			:readerTypes="['ean_reader', 'code_128_reader']"
		/>
</template>

<script>
	import Vue from 'vue';
	import VueQuagga from 'vue-quaggajs';

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
				console.log('detected', data);
			},
		},
		mounted() {
			console.log('componente cargado');
		},
	};
</script>
