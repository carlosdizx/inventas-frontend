<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';

	import numeral from 'numeral';
	import moment from 'moment';

	Vue.filter('toUSD', function(value: number) {
		return numeral(value).format('$0,0');
	});

	Vue.filter('formatDate', (value: any) => {
		if (value) {
			return moment(String(value)).format('ll')
		}
	});

	export default Vue.extend({
		name: 'App',

		data: () => ({
			//
		}),
	});
</script>
