<template>
	<v-card class="mx-auto" height="500" width="500">
		<v-quagga
			height="500"
			:onDetected="logIt"
			:readerTypes="['ean_reader', 'code_128_reader']"
		/>
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

<style scoped>
	.v-quagga {
		height: 50%;
		width: 20%;
	}
</style>
