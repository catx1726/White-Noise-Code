<template>
  <main class="source-type-list-container flex justify-between">
    <div v-if="!pgInfo.showTypeList" class="modal" @click="pgInfo.showTypeList = true" />

    <transition>
      <swiper v-if="pgInfo.audioSourceList.length && !pgInfo.showTypeList" :free-mode="true" :slides-per-view="'auto'" class="source-box flex items-center">
        <svg-icon name="close" class="cursor-pointer text-white fill-white icon" @click="pgInfo.showTypeList = true">close</svg-icon>
        <swiper-slide
          v-for="item of pgInfo.audioSourceList"
          :key="item.link"
          class="source-item cursor-pointer"
          @click.prevent="handleaddAudioSourceToPlayList(item)"
        >
          <svg-icon name="close" class="icon" @click.stop="handleRemoveSource(item)" />
          {{ item.text }}
        </swiper-slide>
      </swiper>
    </transition>

    <transition>
      <swiper v-show="pgInfo.showTypeList" :free-mode="true" :slides-per-view="'auto'" class="type-box flex justify-between">
        <swiper-slide v-for="item of pgInfo.sourceTypeList" :key="item.enum" class="type-item" @click="handleAudioSourceList(item)">
          <span class="title text-2xl">{{ item.title }}</span>
          <pre class="text">{{ item.text }}</pre>
        </swiper-slide>
      </swiper>
    </transition>
  </main>
</template>

<script lang="ts">
export default {
  name: 'SourceListComp'
}
</script>
<script lang="ts" setup>
import {
  addAudioSourceToPlayList,
  AudioSourceList,
  AudioSourceTypeList,
  getAudioSourceListByType,
  removeSource,
  getSource,
  type AudioSourceListType,
  type AudioSourceType
} from '.'
import { reactive, defineProps, onMounted } from 'vue'
import { Info } from '@/components/info_box'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

const pgInfo = reactive({
    showTypeList: true,
    sourceTypeList: AudioSourceTypeList,
    audioSourceList: [] as Array<AudioSourceListType>,
    curType: {} as AudioSourceType
  }),
  emits = defineEmits(['show-side-menu-box']),
  handleaddAudioSourceToPlayList = (item: AudioSourceListType) => {
    emits('show-side-menu-box')
    addAudioSourceToPlayList(item)
  },
  handleAudioSourceList = (type: AudioSourceType) => {
    pgInfo.curType = type
    pgInfo.audioSourceList = getAudioSourceListByType(type)
    pgInfo.showTypeList = !pgInfo.audioSourceList.length

    if (!pgInfo.audioSourceList.length) return Info({ message: '空空如也', type: 'info', show: true, duration: 1000 })
  },
  handleRemoveSource = (item: AudioSourceListType) => {
    let indexList = AudioSourceList.map((i, index) => {
      if (i.link === item.link) return index
    })
    console.log('handleRemoveSource:', indexList, item)

    if (!indexList.length) return
    for (const item of indexList) {
      removeSource(item === undefined ? -1 : item)
    }

    handleAudioSourceList(pgInfo.curType)

    Info({ message: '已移除', type: 'info', show: true, duration: 1000 })
  },
  props = defineProps({ playList: { type: Array<AudioSourceListType>, default: [] } })

onMounted(() => getSource())
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
