<template>
  <v-toolbar clipped-left app>
    <v-toolbar-title>Log Analyser</v-toolbar-title>
    <v-btn @click="openFile" icon>
      <v-icon>folder_open</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  const electron = require('electron')
  import types from '../../types.js';

  export default {
    data () {
      return {
      }
    },
    methods: {
      openFile () {
        let fileUrlArray = electron.remote.dialog.showOpenDialog({properties: ['openFile']});
        //console.log(fileUrlArray);
        if (fileUrlArray && fileUrlArray.length > 0) {
          this.$store.commit(types.SET_FILE_URL, fileUrlArray[0]);
        }
      }
    }
  }
</script>