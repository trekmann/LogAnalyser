<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <home />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar/index';
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    'toolbar': Toolbar,
    'home': Home
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped >

</style>