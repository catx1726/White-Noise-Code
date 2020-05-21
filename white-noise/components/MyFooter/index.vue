<template>
  <div class="footer-container">
    <v-btn
      v-ripple="{ center: true, class: 'blue--text text--lighten-3 ' }"
      color="black"
      text
      icon
      href="https://github.com/catx1726"
    >
      <v-icon dark>mdi-github</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',

  components: {},
  data() {
    return {}
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.footer-container {
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
