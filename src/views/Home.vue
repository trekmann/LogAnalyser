<template>
  <div>
    <Nav></Nav>
    <code-text-field class="fullscreen"></code-text-field>
  </div>
</template>

<script>
import TextField from './../components/TextField/index';
import Nav from '../components/Nav/index';

export default {
  components: {
    'code-text-field': TextField,
    Nav
  },
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fullscreen {
    height: 100%;
  }
</style>
