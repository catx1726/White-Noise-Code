<template>
  <transition>
    <main v-show="pgInfo.show" class="record-container">
      <div v-if="pgInfo.show" class="modal" @click="pgInfo.show = false" />
      <div class="record-box">
        <nothing-here-comp v-if="pgInfo.data[yesterDay]" class="h-full flex items-center justify-center">
          <span class="text-xl">昨日暂无专注</span>
        </nothing-here-comp>
        <div v-else class="flex flex-col items-center justify-center">
          <span class="info self-start">昨日你一共专注于 {{ pgInfo.immerseLen }} 项事宜,具体如下:</span>
          <span v-for="(item, index) of pgInfo.data[yesterDay]" :key="`${item.immerseName}-${index}`" class="immerse-item">
            {{ index + 1 }}. {{ handleDataShow(item) }}
          </span>
        </div>

        <div class="tips-box flex justify-center">
          <span class="info tips text-sm text-accent">{{ ImmerseText.explanation }}</span>
        </div>
      </div>
    </main>
  </transition>
</template>
<script lang="ts">
export default {
  name: 'ImmerseRecordComp'
}
</script>
<script lang="ts" setup>
export interface PageConfigInterface {
  pgInfo: { show: boolean }
}

import { onMounted, reactive } from 'vue'
import { getYesterdayRecord, handleDataShow, yesterDay } from './index'
import { ImmerseText, type ImmerseInterface } from '../immerse/index'
import NothingHereComp from '@/components/nothing_here/index.vue'

let pgInfo = reactive({ data: {} as { [prop: string]: Array<ImmerseInterface> }, show: false, immerseLen: 0 }),
  mountedEntry = async() => {
    pgInfo.data = await getYesterdayRecord()
    if (!pgInfo.data || !pgInfo.data[yesterDay]) return
    pgInfo.immerseLen = pgInfo.data[yesterDay].length
  }

onMounted(() => mountedEntry())

defineExpose({ pgInfo })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
