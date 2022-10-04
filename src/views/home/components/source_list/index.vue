<template>
  <main class="source-type-list-container flex justify-between">
    <div v-show="!pgInfo.showTypeList" class="modal" @click="pgInfo.showTypeList = true" />

    <transition>
      <div v-if="pgInfo.audioSourceList.length && !pgInfo.showTypeList" class="source-box flex items-center">
        <svg-icon name="close" class="cursor-pointer text-white fill-white icon" @click="pgInfo.showTypeList = true">close</svg-icon>
        <div v-for="item of pgInfo.audioSourceList" :key="item.link" class="source-item cursor-pointer" @click="handleaddAudioSourceToPlayList(item)">
          {{ item.text }}
        </div>
      </div>
    </transition>

    <transition>
      <div v-show="pgInfo.showTypeList" class="type-box flex justify-between">
        <div v-for="item of pgInfo.sourceTypeList" :key="item.enum" class="type-item" @click="handleAudioSourceList(item)">
          <span class="title text-2xl">{{ item.title }}</span>
          <pre class="text">{{ item.text }}</pre>
        </div>
      </div>
    </transition>
  </main>
</template>

<script lang="ts">
export default {
  name: 'SourceListComp'
}
</script>
<script lang="ts" setup>
import { addAudioSourceToPlayList, AudioSourceTypeList, getAudioSourceListByType, type AudioSourceListType, type AudioSourceType } from '.'
import { reactive, defineProps } from 'vue'

const pgInfo = reactive({
    showTypeList: true,
    sourceTypeList: AudioSourceTypeList,
    audioSourceList: [] as Array<AudioSourceListType>
  }),
  emits = defineEmits(['show-side-menu-box']),
  handleaddAudioSourceToPlayList = (item: AudioSourceListType) => {
    emits('show-side-menu-box')
    addAudioSourceToPlayList(item)
  },
  handleAudioSourceList = (type: AudioSourceType) => {
    pgInfo.showTypeList = false
    pgInfo.audioSourceList = getAudioSourceListByType(type)
  },
  props = defineProps({ playList: { type: Array<AudioSourceListType>, default: [] } })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
