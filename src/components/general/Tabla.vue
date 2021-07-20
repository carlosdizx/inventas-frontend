<template>
	<v-simple-table>
		<template v-slot:default>
			<thead>
				<tr>
					<th class="text-left" v-for="columna in columnas" :key="columna">
						{{ columna }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in filas">
					<td v-for="valor in Object.values(item)">{{ valor }}</td>
				</tr>
			</tbody>
		</template>
	</v-simple-table>
</template>

<script>
	export default {
		name: 'TablaSimple',
		props: {
			columnas: Array(),
			filas: Array(),
		},
	};
</script>
