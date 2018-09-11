<template>
  <div>
    <v-list-group
      no-action
      sub-group
      value="true"
    >
      <v-list-tile slot="activator">
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-text-field
            label="RexEx Suchstring"
            @input="textFieldChange"
            v-model="localRegExp"
          ></v-text-field>
      </v-list-tile>
      <v-list-tile class="ma-2">
        <ColorPopOver 
          @colorChange="colorChange"
          class="ma-2">
        </ColorPopOver>
      </v-list-tile>
      <v-list-tile class="ma-2">
        <v-btn class="ma-2" block color="error" @click="deleteFilter(id)">Löschen</v-btn>
      </v-list-tile>
    </v-list-group>
  </div>
</template>

<script>
  import ColorPopOver from './ColorPopOver.vue';
  import { mapMutations } from 'vuex';
  import types from './../../../types.js';

  export default {
    components: {
      ColorPopOver
    },
    props: {
      id: String,
      item: Object
    },
    data () {
      return {
        localColor: '',
        localRegExp: ''
      }
    },
    methods: {
      ...mapMutations({
        deleteFilter: types.DELETE_FILTER
      }),
      textFieldChange (e) {
        this.localRegExp = e;
        this.$store.commit(types.UPDATE_FILTER, {
          id: this.id,
          title: this.item.title,
          regExp: this.localRegExp,
          color: this.localColor
        });
      },
      colorChange (e) {
        this.localColor = e;
        this.$store.commit(types.UPDATE_FILTER, {
          id: this.id,
          title: this.item.title,
          regExp: this.localRegExp,
          color: this.localColor
        });      
      }
    }
  }
</script>

<style scoped >
</style>
