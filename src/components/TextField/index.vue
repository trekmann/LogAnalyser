<template>
  <div class="fullscreen">
    <virtual-scroller class="scroller" :items="filteredTexts" item-height="42" buffer="400">
      <template slot-scope="props">
        <code-list-element
          :html="props.item">
        </code-list-element>
      </template>
    </virtual-scroller>
  </div>
</template>

<script>
import CodeListElement from './Components/CodeListElement';
import { VirtualScroller } from 'vue-virtual-scroller';
import { stat } from 'fs';
const fs = require('fs') 

export default {
  created () {
    this.$store.watch((state) => {
      this.fileUrl = state.fileUrl;
      if (this.fileUrl) {
        fs.readFile(this.fileUrl, 'utf8', (err, data) => {
          if (err) throw err;
          this.texts = data.split(/\r?\n/g);
        });
      }
      this.filters = state.filter;
    });
  },
  components: {
    'code-list-element': CodeListElement,
    'virtual-scroller': VirtualScroller
  },
  data() {
    return {
      texts: [],
      filters: [],
      fileUrl: ''
    }
  },
  computed: {
    filteredTexts() { 
      let regExpList = [];
      for (const w of this.filters) {
        regExpList.push(new RegExp(w.regExp, 'gi'));
      }
      const fullExpr = new RegExp(regExpList
        .map(x=>x.source)
        .join("|")
      );
      let list = [];
      for(let e of this.texts) {
        if(e.match(fullExpr)) {
          list.push(JSON.parse(JSON.stringify(e)));
        }
      }
      return list;
    }
  }
}
</script>
 
<style scoped>
.fullscreen {
  height: calc(100vh - 64px);
}
.scroller {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>