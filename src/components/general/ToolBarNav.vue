<template>
	<v-card>
		<v-tabs
			background-color="indigo"
			center-active
			dark
			next-icon="mdi-arrow-right-bold-box-outline"
			prev-icon="mdi-arrow-left-bold-box-outline"
			show-arrows
		>
			<router-link :to="tab.link" v-for="tab in tabs" v-slot="{Navigate}" custom>
				<v-tab>
					{{ tab.texto }}
				</v-tab>
			</router-link>
		</v-tabs>
	</v-card>
</template>

<script>
	export default {
		name: 'ToolBarNav',
		props: {
			tabs: null,
		},
	};
</script>
