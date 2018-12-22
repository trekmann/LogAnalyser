<template>
  <div class="white">
    <div v-html="highlight()"></div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.watch((state) => {
      this.filter = state.filter;
    });
  },
  props: {
    html: String,
  },
  data () {
    return {
      filter: []
    }
  },
  methods: {
    findall(regexp, s) {
      let matches = [];
      s.replace(regexp, function() {
        let arr = ([]).slice.call(arguments, 0);
        let extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
      });
      return matches.length ? matches : null;
    },
    highlight () {
      let ergHTML = this.html;
      let regExpList = [];
      for (const w of this.filter) {
        regExpList.push(new RegExp(w.regExp, 'gm'));
      }
      /*const fullExpr = new RegExp(regExpList
        .map(x=>x.source)
        .join("|"),
        'gm'
      );*/
      //const matchesList = this.findall(fullExpr, this.html);
      this.filter.map((f) => {
        if (!f.regExp) {
          return ergHTML;
        }
        const regExp = new RegExp(f.regExp + "(?![^<>]*>)", "gi");
        ergHTML = ergHTML.replace(regExp, match => {
          return `<span style="background-color:${f.color}" >${match}</span>`
        });
      });
      return ergHTML;
    }
  }
}
</script>