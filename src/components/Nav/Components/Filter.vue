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
            label="RexExp Searchstring"
            @input="textFieldChange"
            v-model="item.regExp"
          ></v-text-field>
      </v-list-tile>
      <v-list-tile class="ma-2">
        <ColorPopOver 
          @colorChange="colorChange"
          class="ma-2">
        </ColorPopOver>
      </v-list-tile>
      <v-list-tile class="ma-2">
        <FilterBool 
        @buttonChange="buttonChange"/>
      </v-list-tile>
      <v-list-tile class="ma-2">
        <v-btn class="ma-2" block color="error" @click="deleteFilter(id)">Delete</v-btn>
      </v-list-tile>
    </v-list-group>
  </div>
</template>

<script>
  import ColorPopOver from './ColorPopOver.vue';
  import FilterBool from './FilterBool.vue';
  import { mapMutations } from 'vuex';
  import types from './../../../types.js';

  export default {
    components: {
      ColorPopOver,
      FilterBool
    },
    props: {
      id: String,
      item: Object
    },
    data () {
      return {
      }
    },
    methods: {
      ...mapMutations({
        deleteFilter: types.DELETE_FILTER
      }),
      textFieldChange (e) {
        this.item.regExp = e;
        this.$store.commit(types.UPDATE_FILTER, {
          id: this.id,
          title: this.item.title,
          regExp: this.item.regExp,
          color: this.item.color,
          orORand: this.item.orORand
        });
      },
      colorChange (e) {
        this.item.color = e;
        this.$store.commit(types.UPDATE_FILTER, {
          id: this.id,
          title: this.item.title,
          regExp: this.item.regExp,
          color: this.item.color,
          orORand: this.item.orORand
        });      
      },
      buttonChange(e) {
        this.item.orORand = e;
        this.$store.commit(types.UPDATE_FILTER, {
          id: this.id,
          title: this.item.title,
          regExp: this.item.regExp,
          color: this.item.color,
          orORand: this.item.orORand
        }); 
      }
    }
  }
</script>

<style scoped >
</style>
