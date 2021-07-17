<template>
	<div>
		<router-link to="inicio" v-slot="{ navigate }" custom>
			<v-btn @click="navigate">Login</v-btn>
		</router-link>
		<router-link to="registro" v-slot="{ navigate }" custom>
			<v-btn @click="navigate">Registro</v-btn>
		</router-link>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
		name: 'Home',
	});
</script>
