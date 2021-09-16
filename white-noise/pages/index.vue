<template>
  <main class="index-container">
    <div class="test-nonblur">
      <div class="slide-box mini m-flex">
        <div
          v-for="i of imgList"
          :key="i.name"
          class="img-item"
          :style="`background-image:url(${i.path})`"
        ></div>
      </div>
      <SourceList />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import SourceList from '~/components/SourceList'

export default {
  components: {
    SourceList
  },
  data() {
    return {
      DOC: '',
      title: 'Home',
      imgList: [
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b609.jpg', name: 'outside-window' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b604.jpg', name: 'inner-window' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b5f6.jpg', name: 'taxi-rain' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b5f2.jpg', name: 'fire-warm' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b5ff.jpg', name: 'lake' }
      ]
    }
  },
  computed: mapState({
    bgImg: (state) => state.container.bgImg
  }),
  watch: {
    bgImg: {
      immediate: false,
      handler(val) {
        this.onUserChangeSourceTag(val)
      }
    }
  },
  mounted() {
    this.DOC = document
  },
  methods: {
    onUserChangeSourceTag(val) {
      const idx = this.handleFindUrlIndex(val)
      const slideBox = this.DOC.querySelector('.slide-box.mini')
      slideBox.style.left = `-${idx * 105}%`
    },
    /* 拿到图片的下标 */
    handleFindUrlIndex(val) {
      return this.imgList.findIndex((i) => i.path === val)
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  min-height: 80vh;
  margin-top: 10vh;
  margin-bottom: 10vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  // background-image: url('/imgs/window-831251_1920.jpg');
  .test-nonblur {
    z-index: 1;
    color: white;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .slide-box.mini {
      width: 100%;
      height: 100%;
      position: absolute;
      transition: all 0.3s ease;
    }
    .slide-box.mini .img-item {
      height: 105%;
      width: 105%;
      left: -2.5%;
      flex-shrink: 0;
      position: relative;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      filter: blur(10px) brightness(0.9) opacity(0.95);
    }
  }
}
</style>
