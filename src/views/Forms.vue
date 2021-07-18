<template>
	<ToolBarForms :tabs="tabs"/>
</template>

<script>
	import ToolBarForms from '../components/forms/ToolBarForms';
	export default {
		name: 'Forms',
		data: () => ({
			tabs: [''],
		}),
		components: {
			ToolBarForms,
		},
    mounted() {
      this.tabs = ['mdi-archive', 'mdi-account-outline'];
    }
  };
</script>

<style scoped></style>
