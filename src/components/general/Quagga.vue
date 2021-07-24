<template>
  <v-card class="mx-auto" height="500" max-width="500">
    <v-quagga :onDetected="logIt" :readerTypes="['ean_reader','code_128_reader']" />
  </v-card>
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
	};
</script>
