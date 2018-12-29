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
import { stat, readFileSync } from 'fs';
const fs = require('fs');

const openFile = (fileUrl) => {
  let data = [];
  data = readFileSync(fileUrl, 'utf8');
  data = data.split(/\r?\n/g);
  return data;
};

const filteredTexts = (filters, texts) => { 
  let expString = '';
  for (const w of filters) {
    expString = `${expString}`
    if (w.orORand) {
      expString = `${expString}|${w.regExp}`
    } else {
      expString = `${expString}(?=.*${w.regExp})`
    }
  }
  const fullExpr = new RegExp(expString, 'gmi');
  let list = [];
  texts.forEach((text) => {
    if (fullExpr.exec(text) != null) {
      list.push(JSON.parse(JSON.stringify(text)));
    }
  });
  return list;
};

export default {
  created () {
    this.$store.watch((state) => {
      const filters = state.filter;
      if (this.fileUrl !== state.fileUrl) {
        this.fileUrl = state.fileUrl;
        this.opendFiles = openFile(state.fileUrl);
      }
      this.filteredTexts = filteredTexts(filters, this.opendFiles);
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
      filteredTexts: [],
      codeElementHeigh: 40,
      opendFiles: [],
      fileUrl: '',
      fullExpr: new RegExp(),
      window: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    scrollerRemainElement() {
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