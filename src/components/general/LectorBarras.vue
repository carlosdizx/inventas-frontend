<template>
	<div>
		<div id="camara"></div>
		<div id="resultado"></div>
	</div>
</template>

<script>
	import Quagga from 'quagga';
	export default {
		name: 'LectorBarras',
		mounted() {
			Quagga.init(
				{
					inputStream: {
						name: 'Live',
						type: 'LiveStream',
						target: document.querySelector('#camara'), // Or '#yourElement' (optional)
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
					console.log('Initialization finished. Ready to start');
					Quagga.start();
				}
			);
			Quagga.onDetected(function(data) {
				console.log(data.codeResult.code);
				document.querySelector('#resultado').innerText = data.codeResult.code;
			});
		},
	};
</script>
