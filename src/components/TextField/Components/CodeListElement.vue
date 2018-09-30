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
    html: String
  },
  data () {
    return {
      filter: []
    }
  },
  methods: {
    highlight () {
      let ergHTML = this.html;
      this.filter.map((f) => {
        if (!f.regExp) {
          return ergHTML;
        }
        const regExp = new RegExp(f.regExp + "(?![^<>]*>)", "gi");
        ergHTML = ergHTML.replace(regExp, match => {
          return '<span style="background-color:' + f.color + ';">' + match + '</span>';
        });
      });
      return ergHTML;
    }
  }
}
</script>