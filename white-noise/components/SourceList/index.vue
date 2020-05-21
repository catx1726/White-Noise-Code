<template>
  <div class="source-container">
    <div class="tab-container">
      <v-item-group v-model="onboarding">
        <v-item v-for="i in sourceList" :key="`btn-${i.tag}`" v-slot:default="{ active }">
          <v-btn
            text
            color="white"
            large
            style="font-size:32px"
            :input-value="active"
            @click="toggle"
          >
            {{ i.tag }}
          </v-btn>
        </v-item>
      </v-item-group>
    </div>

    <v-window v-model="onboarding" class="source-item-container">
      <v-window-item v-for="n in sourceList" :key="`card-${n.tag}`">
        <v-chip-group v-for="item in n.source" :key="item" multiple>
          <v-chip label outlined light text-color="white" @click="playMusic(n.tag, item)">
            {{ item }}
          </v-chip>
        </v-chip-group>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},
  props: { bgImgSrc: { default: '', type: String } },
  data() {
    return {
      DOC: {},
      audios: [],
      onboarding: 0,
      sourceList: [
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
  },

  created() {},

  methods: {
    playMusic(tag, music) {
      // const audio = new Audio('./music/' + tag + '/' + music + '.mp3')
      // audio.play()
      // audio.controls()
      // TODO 2020年5月21日 先检测是否由重复，有就不在允许添加

      const src = './music/' + tag + '/' + music + '.mp3'
      const sourceContainer = this.DOC.querySelector('.source-container')
      if (this.audios.includes(src)) {
        return false
      }

      const audio = this.DOC.createElement('audio')
      audio.setAttribute('src', src)
      audio.setAttribute('loop', true)
      audio.setAttribute('autoplay', true)
      audio.setAttribute('controls', true)

      const fragment = this.DOC.createDocumentFragment()
      fragment.appendChild(audio)
      sourceContainer.appendChild(fragment)
      this.audios.push(src)
      console.log(tag, music)
    },
    toggle() {
      // FIXME source-item 没有清除效果 this.onboarding
      // 点击 tab 时 清空所有 audio
      const delAudios = this.DOC.querySelectorAll('audio')
      const sourceContainer = this.DOC.querySelector('.source-container')
      delAudios.forEach((i) => {
        sourceContainer.removeChild(i)
      })
      this.audios = []

      const len = this.sourceList.length - 1
      this.onboarding < len ? this.onboarding++ : this.onboarding--
      this.$emit('update:bgImgSrc', this.sourceList[this.onboarding].img)
    }
  }
}
</script>
<style lang="scss" scoped>
.source-container {
  width: 50vw;
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
}
</style>
