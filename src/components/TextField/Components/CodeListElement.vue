<template>
  <li v-show="!matchRegExp" class="white">
    <div v-html="highlight()"></div>
  </li>
</template>

<script>
export default {
  created () {
    this.$store.watch((state) => {
      this.filter = state.filter;
    });
  },
  props: {
    html: String
  },
  data () {
    return {
      filter: [],
      matchRegExp: false
    }
  },
  methods: {
    highlight () {
      const spanBegin = '<span style="background-color:';
      const spanMid = ';">';
      const spanEnd = '</span>';
      let ergHTML = this.html;
      this.filter.map((f) => {
        if (!f.regExp) {
          return ergHTML;
        }
        const regExp = new RegExp(f.regExp + "(?![^<>]*>)", "gi");
        if (ergHTML.match(regExp) === null) {
          this.matchRegExp = true;
        } else {
          this.matchRegExp = false;
        }
        ergHTML = ergHTML.replace(regExp, match => {
          return spanBegin + f.color + spanMid + match + spanEnd;
        });
      });
      return ergHTML;
    }
  }
}
</script>