<template>
  <div class="header-container">
    <div class="logo">Corner</div>
    <v-btn
      v-for="item in navList"
      :id="item.text"
      :key="item.link"
      text
      :to="item.link"
      color="white"
    >
      {{ item.text }}
    </v-btn>
    <div v-show="isIdx" class="clock">
      <span id="chose-time" class="chose-time">{{ timE }}</span>
      <v-btn text color="white" @click="timeShow = !timeShow">
        <v-icon>mdi-clock</v-icon>
      </v-btn>
    </div>

    <transition name="times">
      <v-chip-group v-show="timeShow && isIdx" column active-class="primary--text" class="times">
        <v-chip v-for="(time, idx) in times" :key="time" @click="chooseTime(time, idx)">
          {{ time }}min
        </v-chip>
      </v-chip-group>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyHeader',

  components: {},
  data() {
    return {
      DOC: {},
      timer: '',
      timer1: 0,
      ui: true,
      isIdx: false, // 确定是否在首页，如果不在则隐藏时间相关的UI
      navList: [],
      timeShow: false,
      times: ['15', '30', '45', '60'],
      timE: '',
      choseTime: '', // 用户选了时间之后，保存在该容器，然后定时器更新该容器
      chooseLock: false,
      state: ''
    }
  },

  computed: {},

  watch: {
    $route() {
      console.log(this.$route.name)
      if (this.$route.name === 'index') {
        this.isIdx = true
        return
      }
      this.isIdx = false
    }
  },

  beforeMount() {},
  destroyed() {
    // 在组件销毁时取消定时器
    clearTimeout(this.timer)
  },

  mounted() {
    this.DOC = document
    const uiBtn = this.DOC.querySelector('#UI')
    uiBtn.addEventListener('click', this.showUI)
  },

  created() {
    this.navList = this.getNavList()
    if (this.$route.name === 'index') {
      this.isIdx = true
    }
  },
  methods: {
    chooseTime(time, idx) {
      // TODO 在此将时间转换成 秒 然后赋给 choseTime
      console.log('choose time :', time, idx)
      // 重复选择同一个代表取消定时 -=- choseTime.length === 0
      this.choseTime = this.choseTime === time ? '' : time * 60
      if (this.state === time) {
        this.timE = ''
        clearTimeout(this.timer)
        console.log('点击相同的时间')
        this.state = ''
      } else if (this.chooseLock) {
        this.count()
        clearTimeout(this.timer)
        this.state = time
        this.timer = setInterval(this.time1, 1000)
      } else {
        this.count()
        this.timer = setInterval(this.time1, 1000)
        this.state = time
        this.chooseLock = !this.chooseLock
      }
    },
    // 计算时间
    count() {
      const h = this.leftpad(Math.floor(this.choseTime / 3600), 2, 0)
      const m = this.leftpad(Math.floor((this.choseTime / 60) % 60), 2, 0)
      const s = this.leftpad(Math.floor(this.choseTime % 60), 2, 0)
      this.timE = h + `:` + m + `:` + s
    },
    time1() {
      if (this.choseTime > 0) {
        this.count()
        this.choseTime--
      } else {
        this.st()
      }
    },
    // 第一个参数需要补齐的字符第二个补齐几个第三个参数用什么补齐
    leftpad(str, len, ch) {
      str = String(str)
      let i = -1
      if (!ch && ch !== 0) ch = ' '
      len = len - str.length
      while (++i < len) {
        str = ch + str
      }
      return str
    },
    // 当定时器到了时间就寻找所以正在播放的标签然后发起暂停命令
    stop() {
      this.DOC = document
      const asd = this.DOC.querySelectorAll(`audio`)
      asd.forEach((item) => {
        item.pause()
      })
      console.log('所有节点', asd)
      this.chooseLock = !this.chooseLock
      clearTimeout(this.timer)
    },
    showUI() {
      const container = this.DOC.querySelector('.content-container')
      const logo = this.DOC.querySelector('.logo')
      const clock = this.DOC.querySelector('.clock')
      this.ui = !this.ui
      const tempOpcity = this.ui ? '1' : '0'
      clock.style = 'opacity:' + tempOpcity
      container.style = 'opacity:' + tempOpcity
      logo.style = 'opacity:' + tempOpcity
    },
    ...mapGetters({
      getNavList: 'header/getAllNavList'
    })
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  height: 10vh;
  display: flex;
  font-family: consolas;
  justify-content: flex-end;
  align-items: center;
  .logo {
    color: white;
    padding-left: 20px;
    user-select: none;
    font-size: 30px;
    flex-grow: 1;
    position: relative;
    transition: all 0.3s ease;
  }
  .clock,
  .times,
  .chose-time {
    position: absolute;
    top: 10%;
    transition: all 0.3s ease;
  }
  .times {
    top: 15%;
  }
  .chose-time {
    color: white;
    // right: 20%;
    font-size: 26px;
    line-height: 26px;
    right: 100px;
  }
}
// content page transition
.times-enter-active,
.times-leave-active {
  transition: opacity 0.3s ease;
}
.times-enter, .times-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
