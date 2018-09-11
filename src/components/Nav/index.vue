<template>
  <v-navigation-drawer permanent clipped app>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-btn block flat @click="addFilter()">
        <v-icon>queue</v-icon> Add new Filter
      </v-btn>
      <v-divider></v-divider>
      <filter-tile 
        v-for="item in items"
        :key="item.title"
        :id="item.id"
        :item="item"
        ></filter-tile>
        <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import FilterTile from './Components/Filter.vue';
  import types from '../../types.js';

  export default {
    components: {
      'filter-tile': FilterTile,
    },
    data () {
      return {
        drawer: true
      }
    },
    computed: {
      items () {
        return this.$store.getters.filter;
      },
      newFilterTitle () {
        return 'Filter ' + this.items.length;
      }
    },
    methods: {
      addFilter() {
        this.$store.commit(types.ADD_FILTER, {
          title: this.newFilterTitle,
          color: '#75B3EF',
          regExp: ''
        });
      }
    }
  }
</script>