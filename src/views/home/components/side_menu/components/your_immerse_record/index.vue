<template>
  <transition>
    <main v-show="pgInfo.show" class="record-container">
      <div v-if="pgInfo.show" class="modal" @click="pgInfo.show = false" />
      <div class="record-box">
        <nothing-here-comp v-if="!pgInfo.data || !pgInfo.data.length" class="h-full flex items-center justify-center">
          <span class="text-xl">暂无专注</span>
        </nothing-here-comp>
        <div v-else class="overflow-y-auto h-full">
          <div :title="RecordSelect.pastSevenDays.title" class="record-type-item">
            <div class="flex flex-col">
              <span class="title">
                {{ RecordSelect.pastSevenDays.title }}
              </span>
              <span class="sub-title">{{ RecordSelect.pastSevenDays.handleImmerseSumTime(pgInfo.data) }}</span>
              <span v-for="item of pgInfo.data" :key="item.immerseName" class="content text-sm">- {{ RecordSelect.pastSevenDays.getData(item) }}</span>
            </div>
          </div>
          <div
            v-for="item of [RecordSelect.pastSevenDaysMostLong, RecordSelect.pastSevenDaysMostMorning, RecordSelect.pastSevenDaysMostNight]"
            :key="item.title"
            class="record-type-item"
            :title="item.title"
          >
            <div v-if="item.show" class="flex flex-col">
              <span class="title">{{ item.title }}</span>
              <span class="content">{{ item.getData(pgInfo.data) }}</span>
            </div>
          </div>
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
import { getPastDateSpanImmerseRecord, RecordSelect } from './index'
import { ImmerseText, type ImmerseInterface, ImmerseConfig } from '../immerse/index'
import NothingHereComp from '@/components/nothing_here/index.vue'

let pgInfo = reactive({ data: [] as Array<ImmerseInterface>, show: false, immerseLen: 0 }),
  mountedEntry = async() => {
    pgInfo.data = await getPastDateSpanImmerseRecord(ImmerseConfig.recordPastSpan)
    if (!pgInfo.data || !pgInfo.data) return
    pgInfo.immerseLen = pgInfo.data.length
  }

onMounted(() => mountedEntry())

defineExpose({ pgInfo })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
