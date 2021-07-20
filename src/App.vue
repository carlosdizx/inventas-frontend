<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import numeral from 'numeral';

Vue.filter('toUSD', function(value: number) {
  return numeral(value).format('$0,0');
});

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
