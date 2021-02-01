<template>
  <v-app class="app-container">
    <div class="img-preload" client-only>
      <div class="show-box">
        <div class="slide-box m-flex">
          <div
            v-for="i of imgList"
            :key="i.name"
            class="img-item"
            :style="`background-image:url(${i.path})`"
          ></div>
        </div>
      </div>
      <img />
    </div>
    <MyHeader class="header" />
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
      // TODO 可优化
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
      this.onUserChangeSourceTag(val)
    }
  },
  created() {},
  methods: {
    onUserChangeSourceTag(val) {
      const idx = this.handleFindUrlIndex(val)
      const slideBox = this.DOC.querySelector('.slide-box')
      slideBox.style.transform = `translate(-${idx * 100}vw)`
      // console.log('onUserChangeSourceTag val:', val, idx)
    },
    handleFindUrlIndex(val) {
      return this.imgList.findIndex((i) => i.path === val)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  // background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  // TODO 可优化
  // background-image: url('https://s3.ax1x.com/2021/01/26/sjvAL4.jpg');
  --base-index: 10;
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
.header,
.content-container {
  z-index: calc(var(--base-index) * 2);
}

.img-preload,
.show-box,
.img-item,
.slide-box {
  width: 100vw;
  min-height: 110vh;
  overflow: hidden;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: var(--base-index);
  transition: all 0.3s ease;
}
.img-item {
  position: relative;
}
.slide-box {
  width: auto;
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
