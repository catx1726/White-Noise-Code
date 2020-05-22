<template>
  <v-app :style="'background-image: url(' + './imgs/' + bgImg + ')'" class="app-container">
    <div class="img-preload">
      <img src="/White-Site/imgs/fire-warm.jpg" alt="" />
      <img src="/White-Site/imgs/window.jpg" alt="" />
      <img src="/White-Site/imgs/water.jpg" alt="" />
      <img src="/White-Site/imgs/window-831251_1920.jpg" alt="" />
      <img src="/White-Site/imgs/taxi-rain.jpg" alt="" />
    </div>
    <MyHeader />
    <Nuxt class="content-container" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from '~/components/MyHeader'

export default {
  components: {
    MyHeader
  },
  data() {
    return {}
  },
  computed: mapState({
    bgImg: (state) => state.container.bgImg
  }),
  watch: {
    bgImg(val) {
      return val
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.app-container {
  // background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.content-container {
  height: 80vh;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: white;
  transition: all 0.3s ease;
}
.img-preload {
  position: absolute;
  left: -9999px;
  top: -1000px;
  z-index: -100;
}
</style>
