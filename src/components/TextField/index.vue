<template>
  <div class="fullscrenn">
    <virtual-list class="scroller" :size="codeElementHeigh" :remain="scrollerRemainElement">
      <code-list-element
        v-for="(item, index) of filteredTexts" :key="index"
          :html="item">
      </code-list-element>
    </virtual-list>
</div>
</template>

<script>
import CodeListElement from './Components/CodeListElement';
import virtualList from 'vue-virtual-scroll-list'
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
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    'virtual-list': virtualList,
    'code-list-element': CodeListElement
  },
  data() {
    return {
      texts: [],
      filters: [],
      fileUrl: '',
      codeElementHeigh: 40,
      window: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    filteredTexts() { 
      let regExpList = [];
      for (const w of this.filters) {
        regExpList.push(new RegExp(w.regExp, 'gi'));
      }
      const fullExpr = new RegExp(regExpList
        .map(x=> {
          return '(?=.*' + x.source + ')'
        })
        .join('')
        //.join("|")
      );
      let list = [];
      for(let e of this.texts) {
        if(e.match(fullExpr)) {
          list.push(JSON.parse(JSON.stringify(e)));
        }
      }
      return list;
    },
    scrollerRemainElement() {
      console.log(this.window.height);
      return (this.window.height-64)/this.codeElementHeigh;
    }
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
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