<template>
  <main class="side-menu-container">
    <div v-if="pgInfo.showMenu" class="modal" @click="pgInfo.showMenu = false" />
    <div class="trigger-box flex justify-end">
      <svg-icon :name="pgInfo.showMenu ? 'close' : 'open'" class="cursor-pointer" @click="pgInfo.showMenu = !pgInfo.showMenu" />
    </div>
    <transition>
      <div v-show="pgInfo.showMenu" class="side-menu-box">
        <div class="play-list-box">
          <transition-group>
            <div v-for="(item, index) of pgInfo.playList" :key="item.link" class="play-item flex flex-col items-start justify-between flex-wrap">
              <div class="flex justify-between items-center" style="width: 100%">
                <span>{{ item.text }}</span>
                <svg-icon name="close" class="cursor-pointer" @click="removeAudioSourceToPlayList(index)" />
              </div>
              <audio :src="item.link" loop autoplay controls />
            </div>
          </transition-group>
        </div>
        <div class="add-your-source-box flex justify-between">
          <span class="cursor-pointer" @click="$emit('show-custom-box')">添加音源</span>
          <span class="cursor-pointer" @click="resetAudioSource">恢复预设</span>
        </div>
      </div>
    </transition>
  </main>
</template>

<script lang="ts">
export default {
  name: 'SideMenuComp'
}
</script>
<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { PlayList, removeAudioSourceToPlayList, resetAudioSource } from '../source_list'

export interface PageConfigInterface {
  pgInfo: { showMenu: boolean }
}

const pgInfo = reactive({ showMenu: false, playList: PlayList })

defineExpose({ pgInfo })
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
