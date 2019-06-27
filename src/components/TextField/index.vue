<template>
  <div class="fullscrenn">
    <loading :active.sync="isLoading"
        :height="150"
        :width="150"
        :is-full-page="fullPage"></loading>
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
import Loading from 'vue-loading-overlay';
import virtualList from 'vue-virtual-scroll-list'
import { stat, readFile } from 'fs';

const filteredTexts = (filters, texts) => { 
  let list = [];
  for (let index = 0; index < texts.length; index++) {
    const element = texts[index];
    for (const w of filters) {
      if (element.includes(w.regExp)) {
        list.push(element);
        break;
      }
    }
  }
  return list;
};

export default {
  created () {
    this.$store.watch((state) => {
      const filters = state.filter;
      if (this.fileUrl !== state.fileUrl) {
        this.isLoading = true;
        this.fileUrl = state.fileUrl;
        readFile(this.fileUrl, async (err, data) => {
          this.opendFiles = await data.toString().split(/\r?\n/g);
          this.filteredTexts = filteredTexts(filters, this.opendFiles);
          this.isLoading = false;
        });
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
    'code-list-element': CodeListElement,
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: false,
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
      return (this.window.height-64)/this.codeElementHeigh*2;
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