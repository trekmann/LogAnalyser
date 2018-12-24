<template>
  <v-btn-toggle @change="_toggle" mandatory v-model="toggle">
    <v-Btn>AND</v-Btn>
    <v-Btn>OR</v-Btn>
  </v-btn-toggle>
</template>

<script>
export default {
  data () {
    return {
      toggle: 1
    }
  },
  methods: {
    _toggle(event) {
      this.$emit('buttonChange', event);
    }
  }
}
</script>
