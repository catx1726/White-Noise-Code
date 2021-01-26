<template>
  <v-app :style="`background-image:url(${bgImg})`" class="app-container">
    <div class="img-preload">
      <img v-for="i of imgList" :key="i.name" :src="i.path" lazy />
    </div>
    <MyHeader />
    <transition name="content">
      <Nuxt class="content-container" />
    </transition>
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
    return {
      imgList: [
        { path: 'https://s3.ax1x.com/2021/01/26/sjvAL4.jpg', name: 'outside-window' },
        { path: 'https://s3.ax1x.com/2021/01/26/sjvFQU.jpg', name: 'inner-window' },
        { path: 'https://s3.ax1x.com/2021/01/26/sjvCWV.jpg', name: 'taxi-rain' },
        { path: 'https://s3.ax1x.com/2021/01/26/sjvpiq.jpg', name: 'fire-warm' },
        { path: 'https://s3.ax1x.com/2021/01/26/sjjzon.jpg', name: 'lake' }
      ]
    }
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
  min-height: 50vh;
  // OK 修复瞬间字体超大BUG
  // font-size: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: all 0.3s ease;
}
.img-preload {
  position: absolute;
  left: -9999px;
  // OK 修复留白BUG
  top: -9999px;
  z-index: -100;
}

// content page transition
.content-enter-active,
.content-leave-active {
  transition: opacity 0.3s ease;
}
.content-enter, .content-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
<style lang="scss"></style>
