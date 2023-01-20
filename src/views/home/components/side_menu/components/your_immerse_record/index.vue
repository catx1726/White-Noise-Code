<template>
  <transition>
    <main v-show="pgInfo.show" class="record-container">
      <div v-if="pgInfo.show" class="modal" @click="pgInfo.show = false" />
      <div class="record-box flex flex-col">
        <span>昨日你一共专注于 {{ pgInfo.immerseLen }} 项事宜,具体如下:</span>
        <span v-for="(item, index) of pgInfo.data[yesterDay]" :key="`${item.immerseName}-${index}`" class="immerse-item">{{ index + 1 }}. {{ handleDataShow(item) }}</span>
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
import type { ImmerseInterface } from '../immerse/index'

let pgInfo = reactive({ data: {} as { [prop: string]: Array<ImmerseInterface> }, show: false, immerseLen: 0 }),
  mountedEntry = async() => {
    pgInfo.data = await getYesterdayRecord()
    pgInfo.immerseLen = pgInfo.data[yesterDay].length
  }

onMounted(() => mountedEntry())

defineExpose({ pgInfo })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
