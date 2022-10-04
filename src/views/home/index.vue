<template>
  <main class="main-container flex flex-col justify-end text-white">
    <side-menu-comp @show-custom-box="showCustomBox" />
    <poem-comp />
    <source-list-comp />
    <info-comp />
    <custom-source ref="customCompRef" @add-source-list="addSourceList" />
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>

<script setup lang="ts">
import CustomSource, { type PageConfigInterface } from './components/custom-source/index.vue'
import SideMenuComp from './components/side_menu/index.vue'
import InfoComp from './components/info/index.vue'
import SourceListComp from './components/source_list/index.vue'
import PoemComp from './components/poem/index.vue'

import { onMounted, reactive, ref } from 'vue'
import { addSource, PlayList, removeAudioSourceToPlayList, type AudioSourceListType } from './components/source_list'

let pgInfo = reactive({ playList: PlayList }),
  addSourceList = addSource,
  customCompRef = ref<PageConfigInterface>(),
  showCustomBox = () => {
    if (!customCompRef.value) return
    customCompRef.value.pgInfo.show = true
    console.log('showCustomBox:', customCompRef.value?.pgInfo.show)
  }
</script>

<style scoped>
@import './index.scss';
</style>
