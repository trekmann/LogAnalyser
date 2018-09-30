<template>
  <v-btn-toggle block mandatory v-model="value">
    <v-Btn>AND</v-Btn>
    <v-Btn>OR</v-Btn>
  </v-btn-toggle>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
