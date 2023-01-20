<template>
  <main class="side-menu-container" :style="{ 'z-index': pgInfo.showMenu ? 30 : 0 }">
    <div v-if="pgInfo.showMenu" class="modal" @click="pgInfo.showMenu = false" />
    <div class="trigger-box flex justify-end">
      <span class="cursor-pointer trigger-icon" @click="pgInfo.showMenu = !pgInfo.showMenu">{{ pgInfo.showMenu ? '收' : '展' }}</span>
      <!-- <svg-icon v-show="!pgInfo.showMenu" name="open" class="cursor-pointer" @click="pgInfo.showMenu = true" /> -->
    </div>
    <transition>
      <div v-show="pgInfo.showMenu" class="side-menu-box">
        <div class="play-list-box">
          <transition-group>
            <div v-for="(item, index) of pgInfo.playList" :key="item.link" class="play-item flex flex-col items-start justify-between flex-wrap">
              <div class="flex justify-between items-center" style="width: 100%">
                <span>{{ item.text }}</span>
                <span class="cursor-pointer" @click="removeAudioSourceToPlayList(index)">{{ '删' }}</span>
                <!-- <svg-icon name="close" class="cursor-pointer" @click="removeAudioSourceToPlayList(index)" /> -->
              </div>
              <audio :src="item.link" loop autoplay controls />
            </div>
          </transition-group>
        </div>

        <div class="flex show-immerse-record-box">
          <button @click="clickImmerseRecordButton()">回顾昨日</button>
        </div>

        <div class="add-your-source-box flex justify-between">
          <span class="cursor-pointer" @click="$emit('show-custom-box')">添加音源</span>
          <span class="cursor-pointer" @click="resetAudioSource">恢复预设</span>
        </div>

        <immerse-comp />
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

import ImmerseComp from './components/immerse/index.vue'

import { PlayList, removeAudioSourceToPlayList, resetAudioSource } from '../source_list'

export interface PageConfigInterface {
  pgInfo: { showMenu: boolean }
}

const pgInfo = reactive({ showMenu: false, playList: PlayList }),
  emit = defineEmits(['show-immerse-record-comp', 'show-custom-box']),
  clickImmerseRecordButton = () => {
    emit('show-immerse-record-comp', true)
    pgInfo.showMenu = false
  }

defineExpose({ pgInfo })
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
