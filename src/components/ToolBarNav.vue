<template>
	<v-card>
    <v-toolbar color="indigo" dark flat>
      <v-toolbar-title>Inventas</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
		<v-tabs
			background-color="indigo"
			center-active
			dark
			next-icon="mdi-arrow-right-bold-box-outline"
			prev-icon="mdi-arrow-left-bold-box-outline"
			show-arrows
		>
			<router-link
				:to="tab.link"
				v-for="(tab, index) in tabs"
				v-slot="{ navigate }"
				custom
			>
				<v-tab @click="navigate">
					<v-icon>{{ tab.icono }}</v-icon>
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
