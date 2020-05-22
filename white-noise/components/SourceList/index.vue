<template>
  <div class="source-container">
    <div class="tab-container">
      <v-item-group v-model="onboarding">
        <v-item v-for="(i, idx) in sourceList" :key="`btn-${i.tag}`" v-slot:default="{ active }">
          <v-btn
            text
            color="white"
            large
            style="font-size:32px"
            :input-value="active"
            @click="toggle(idx)"
          >
            {{ i.tag }}
          </v-btn>
        </v-item>
      </v-item-group>
    </div>

    <v-window v-model="onboarding" class="source-item-container">
      <v-window-item v-for="n in sourceList" :key="`card-${n.tag}`">
        <v-chip-group v-for="(item, idx) in n.source" :key="idx" multiple>
          <v-chip label filter outlined light text-color="white" @click="playMusic(n.tag, item)">
            {{ item }}
          </v-chip>
        </v-chip-group>
      </v-window-item>
    </v-window>
    <div class="your-list-container"></div>
  </div>
</template>

<script>
export default {
  name: 'SourceList',

  components: {},
  props: { bgImgSrc: { default: '', type: String } },
  data() {
    return {
      songList: [],
      DOC: {},
      WINDOW: {},
      audios: [],
      onboarding: 0,
      listLock: true,
      sourceList: [
        {
          tag: 'bird',
          img: 'window-831251_1920.jpg',
          source: [
            'jmiddlesworth__bird-call-in-spring',
            'inspectorj__bird-whistling-a',
            'straget__cranes-3'
          ]
        },
        {
          tag: 'lake',
          img: 'water.jpg',
          source: [
            'sanus-excipio__lake-harsha-pier-steve-bayer',
            'pflanigan__lake-biwa',
            'psnflute1984__shore-of-a-lake-with-bird-chirping'
          ]
        },
        {
          tag: 'rain',
          img: 'fire-warm.jpg',
          source: [
            'light-rain-on-umbrella',
            'wyronroberth__rain-random',
            'bastipictures__distant-rain',
            'blimp66__rain-storm'
          ]
        },
        {
          tag: 'classic',
          img: 'window.jpg',
          source: [
            'Aage Kvalbein - Romanza (Trad)',
            'Arcade Fire - Song On The Beach',
            'MayPiano - 钢琴《在法国的十三天》13 jours en France ／ Piano Solo（翻自 Francis Lai）',
            '高志坚,小平 - 殉'
          ]
        },
        {
          tag: 'jazzhiphop',
          img: 'taxi-rain.jpg',
          source: [
            'a l e x - Stop Messin Me Up When Im Tryna Summon Bahamut',
            'elijah who - hideaway',
            'Joe Bae - studybreak'
          ]
        }
      ]
    }
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.DOC = document
    // this.WINDOW = window
    // OK 不能监听 DOC 不然点切换也会 隐藏了..
    // this.DOC.addEventListener('click', this.showUI)
  },

  created() {},

  /*
    DES 今日首要
    OK 1. 方法提出
    OK 2. song 交互完成
    OK 3. song-list 样式编写
  */

  methods: {
    appendYourList() {
      // 在 sourceList 数组的最后一个对象的 source 数组 中
      const lastIdx = this.sourceList.length - 1
      this.sourceList[lastIdx].source.push(this.audios)
      console.log('check yourList:', this.sourceList[lastIdx].source)
    },
    createAudioEle(src, musicName) {
      const sourceContainer = this.DOC.querySelector('.your-list-container')
      const titleEle = this.DOC.createElement('span')
      titleEle.innerHTML = musicName + ' '
      titleEle.style = 'font-size:20px;margin-top:10px'
      const audio = this.DOC.createElement('audio')
      audio.setAttribute('src', src)
      audio.setAttribute('loop', true)
      audio.setAttribute('autoplay', true)
      audio.setAttribute('controls', true)
      audio.style = 'width:100%;'
      const fragment = this.DOC.createDocumentFragment()
      fragment.appendChild(titleEle)
      fragment.appendChild(audio)
      sourceContainer.appendChild(fragment)
      this.audios.push(musicName)
    },
    deleteAudioEle(src, musicName) {
      // OK 拿什么去找该节点 querySelector("audio[src='...']");
      const sourceContainer = this.DOC.querySelector('.your-list-container')
      const delAudio = this.DOC.querySelector(`audio[src='${src}']`)
      // console.log('检测当前删除 audio 的 name 节点:', delAudio.previousSibling)
      const idx = this.audios.indexOf(musicName)
      sourceContainer.removeChild(delAudio.previousSibling)
      sourceContainer.removeChild(delAudio)
      this.audios.splice(idx, 1)
    },
    playMusic(tag, musicName) {
      const src = './music/' + tag + '/' + musicName + '.wav'
      if (this.audios.includes(musicName)) {
        this.deleteAudioEle(src, musicName)
        return
      }
      this.createAudioEle(src, musicName)
      console.log(tag, musicName)
    },
    toggle(idx) {
      // console.log('before onboarding:', this.onboarding, 'idx:', idx)
      this.onboarding = idx
      this.listLock = idx !== this.sourceList.length - 1
      this.$store.dispatch('container/changeBgImg', this.sourceList[this.onboarding].img)
      // console.log('after onboarding:', this.onboarding)
    }
  }
}
</script>
<style lang="scss" scoped>
.source-container {
  width: 50vw;

  transition: all 0.3s ease;
  .tab-container {
    display: flex;
    font-size: 50px;
    max-height: 100px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid white;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .source-item-container {
    display: flex;
    flex-wrap: wrap;
  }
  .your-list-container {
    display: flex;
    border-top: 1px solid white;
    padding-top: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>
