<template>
	<v-card>
		<v-toolbar color="blue darken-3" dark flat>
			<v-app-bar-nav-icon>
				<router-link to="/inicio" v-slot="{ navigate }" custom>
					<v-btn @click="navigate" role="link" icon>
						<v-icon>mdi-arrow-left-thin-circle-outline</v-icon>
					</v-btn>
				</router-link>
			</v-app-bar-nav-icon>
			<v-toolbar-title>Registros</v-toolbar-title>
		</v-toolbar>
		<v-tabs background-color="blue darken-3" color="white">
			<v-tab v-for="(tab, index) in tabs" :key="index" @click="cambiarIndex(index + 1)">
				<v-icon>{{ tab }}</v-icon>
			</v-tab>
		</v-tabs>
		<v-card max-width="1000">
			<ProductoForm v-if="index === 1" />
			<ClienteForm v-if="index === 2" />
			<InventarioForm v-if="index === 3" />
		</v-card>
	</v-card>
</template>

<script>
	import ProductoForm from '../../components/forms/ProductoForm';
	import ClienteForm from '../../components/forms/ClienteForm';
	import InventarioForm from '../../components/forms/InventarioForm';
	export default {
		name: 'Registro',
		components: {
			ProductoForm,
			ClienteForm,
			InventarioForm,
		},
		data: () => ({
			tabs: ['mdi-archive', 'mdi-account-outline', 'mdi-warehouse'],
			index: 1,
		}),
		methods: {
			cambiarIndex(index) {
				this.index = index;
			},
		},
	};
</script>

<style scoped></style>
