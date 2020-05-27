<template>
  <div class="about-container">
    <ul>
      <li>
        代码托管：
        <a href="https://github.com/catx1726/White-Noise">gitHub.com</a>
      </li>
      <li>
        音频来源：
        <a href="https://freesound.org/">freesound.org</a>
      </li>
      <li>
        参考网站：
        <a href="http://rainyscope.com/#slide-2">rainyscope.com</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About',

  components: {},
  data() {
    return {
      title: 'About'
    }
  },
  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {},

  methods: {},
  head() {
    return {
      title: this.title
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  a {
    text-decoration: none;
  }
  height: 100vh;
  font-size: 30px;
  background-size: contain;
  background-position: center;
  li {
    list-style: none;
  }
}
</style>
