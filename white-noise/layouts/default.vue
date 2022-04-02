<template>
  <v-app class="app-container">
    <!-- TODO 可优化 -->
    <div class="loader m-flex flex-jc-center flex-an-center" style="bottom:30vh">
      <span class="outcubic"></span>
    </div>
    <div class="img-preload">
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
    </div>
    <MyHeader class="header" />
    <transition name="content">
      <Nuxt class="content-container" />
    </transition>

    <v-snackbar v-model="domainInfo.show" :timeout="0">
      <div>
        {{ domainInfo.text }}
        <a :href="domainInfo.newURL" target="blank">corner.adoba.site</a>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="domainInfo.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { checkDomainName } from '../utils/dom/normal'
import MyHeader from '~/components/MyHeader'
import { handleImgLoaded } from '~/utils/dom/img'

const CONSOLE_TAG = 'layou default.vue'

export default {
  components: {
    MyHeader
  },
  data() {
    return {
      // TODO 可优化
      DOC: null,
      imgList: [
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b609.jpg', name: 'outside-window' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b604.jpg', name: 'inner-window' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b5f6.jpg', name: 'taxi-rain' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b5f2.jpg', name: 'fire-warm' },
        { path: 'https://img.imgdb.cn/item/605c8bde8322e6675cc6b5ff.jpg', name: 'lake' }
      ],
      domainInfo: {
        show: false,
        text: '非常抱歉,该域名即将过期,现已迁移到:',
        newURL: 'https://corner.adoba.site'
      }
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
  created() {},
  mounted() {
    this.DOC = document
    this.handleImageLoader()
    this.handleCheckDomain()
  },
  methods: {
    handleCheckDomain() {
      this.domainInfo.show = checkDomainName('www.adba.club')
      console.log('checkDomain:', this.domainInfo.show)
    },
    onUserChangeSourceTag(val) {
      const idx = this.handleFindUrlIndex(val)
      const slideBox = this.DOC.querySelector('.slide-box')
      slideBox.style.transform = `translate(-${idx * 100}vw)`
    },
    /* 监听图片是否加载完毕 */
    handleImageLoader() {
      const pureUrlList = this.imgList.map((item) => item.path)
      const promiseList = handleImgLoaded(pureUrlList)

      Promise.all(promiseList).then(() => {
        this.handlePerloaderState()
        console.log(`${CONSOLE_TAG} handleImageLoader:`, pureUrlList, promiseList)
      })
    },
    handlePerloaderState() {
      const preloaderDOM = this.DOC.querySelector('.loader')
      preloaderDOM.classList.add('remove')
    },
    /* 拿到图片的下标 */
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
  min-height: 100vh;
  overflow: hidden;
  position: fixed;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
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
