<template>
  <main class="main-container flex flex-col justify-end text-white">
    <side-menu-comp ref="sideMenuCompRef" @show-custom-box="showCustomComp" />
    <poem-comp />
    <source-list-comp @show-side-menu-box="showSideMenuComp" />
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
import CustomSource, { type PageConfigInterface as CustomSourceConfig } from './components/custom-source/index.vue'
import SideMenuComp, { type PageConfigInterface as SideMenuConfig } from './components/side_menu/index.vue'
import InfoComp from './components/info/index.vue'
import SourceListComp from './components/source_list/index.vue'
import PoemComp from './components/poem/index.vue'

import { onMounted, reactive, ref } from 'vue'
import { addSource, PlayList, removeAudioSourceToPlayList, type AudioSourceListType } from './components/source_list'

let pgInfo = reactive({ playList: PlayList }),
  addSourceList = addSource,
  customCompRef = ref<CustomSourceConfig>(),
  sideMenuCompRef = ref<SideMenuConfig>(),
  showCustomComp = () => {
    if (!customCompRef.value) return
    customCompRef.value.pgInfo.show = true
    console.log('showCustomBox:', customCompRef.value?.pgInfo.show)
  },
  showSideMenuComp = () => {
    if (!sideMenuCompRef.value) return
    sideMenuCompRef.value.pgInfo.showMenu = true
    console.log('showSideMenuComp:', sideMenuCompRef.value.pgInfo.showMenu)
  }
</script>

<style scoped>
@import './index.scss';
</style>
