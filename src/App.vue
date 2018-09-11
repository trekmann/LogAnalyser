<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar/index';

export default {
  name: 'App',
  components: {
    'toolbar': Toolbar
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped >

</style>