<template>
  <div>
    <code-list>
      <code-list-element 
        v-for="(t, index) in text"
        :key="index"
        :html="t" />
    </code-list>
  </div>
</template>

<script>
import CodeList from './Components/CodeList';
import CodeListElement from './Components/CodeListElement';
const fs = require('fs') 

export default {
  created () {
    this.$store.watch((state) => {
      this.fileUrl = state.fileUrl;
      if (this.fileUrl) {
        fs.readFile(this.fileUrl, 'utf8', (err, data) => {
          if (err) throw err;
          this.text = data;
          this.text = this.text.split(/\r?\n/g).filter(Boolean);
        });
      }
    });
  },
  components: {
    'code-list': CodeList,
    'code-list-element': CodeListElement
  },
  data() {
    return {
      text: [],
      fileUrl: ''
    }
  }
}
</script>