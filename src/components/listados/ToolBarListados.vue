<template>
	<v-card>
		<v-toolbar color="green" dark flat>
			<v-toolbar-title>Listados</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-toolbar>
		<v-tabs
			background-color="green"
			center-active
			dark
			next-icon="mdi-arrow-right-bold-circle-outline"
			prev-icon="mdi-arrow-left-bold-circle-outline"
			show-arrows
		>
			<v-tab v-for="(tab, index) in tabs" :key="index" @click="cambiarIndex(index + 1)">
				<v-icon>{{ tab }}</v-icon>
			</v-tab>
		</v-tabs>
		<v-btn disabled text>
      {{ index === 1 ? 'Productos/Servicios' : 'Clientes' }}
    </v-btn>
	</v-card>
</template>

<script>
	export default {
		name: 'ToolBarListados',
		data: () => ({
			index: 1,
		}),
		props: { tabs: Array },
		methods: {
			cambiarIndex(indice) {
				this.index = indice;
			},
		},
	};
</script>
