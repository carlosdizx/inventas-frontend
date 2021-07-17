<template>
	<div>
		<router-link to="inicio" v-slot="{ navigate }" custom>
			<v-btn @click="navigate">Login</v-btn>
		</router-link>
		<router-link to="registro" v-slot="{ navigate }" custom>
			<v-btn @click="navigate">Registro</v-btn>
		</router-link>
		<br />
		<hr />
		{{ usuario }}
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState } from 'vuex';

	export default Vue.extend({
		name: 'Home',
		computed: {
			...mapState(['usuario']),
		},
	});
</script>
