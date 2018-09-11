<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" offset-x>
      <v-btn :color="color" block slot="activator">
        Makierung wählen
      </v-btn>
      <v-card>
        <color-picker 
          :value="color" 
          @input="updateColor"></color-picker>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import { Chrome } from 'vue-color';

  export default {
    components: {
      'color-picker': Chrome,
    },
    data: () => {
      return {
        menu: false,
        color: '#75B3EF'
      }
    },
    methods: {
      updateColor(e) {
        this.color = e.hex;
        this.$emit('colorChange', this.color);
      }
    }
  };
</script>