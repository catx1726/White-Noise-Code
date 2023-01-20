<template>
  <main class="immerse-container flex justify-between flex-wrap">
    <div class="input-box">
      <input v-model="pgInfo.immerseName" autocomplete="on" type="text" placeholder="专注于何事" />
      <button class="immerse-button" @click="pgInfo.immerse = startNewImmerse(pgInfo.immerseName, pgInfo.immerse)">即刻起</button>
    </div>
    <div class="timer-box text-end">
      <span>{{ handleTimerShow(pgInfo.immerse) }}</span>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'ImmerseComp'
}
</script>
<script lang="ts" setup>
import { reactive, onMounted, watch, onUnmounted } from 'vue'
import { numberToCN, timeFliesFast } from '@/utils/index'
import { type ImmerseInterface, startNewImmerse, autoSaveImmerse, initImmerseDB } from '.'

let intervalID: number

const pgInfo = reactive({
    immerseName: '',
    immerse: { immerseName: '万物萌生', startTime: new Date().getTime(), duration: { hour: 0, min: 0, sec: 0 } } as ImmerseInterface,
    record: false
  }),
  handleTimerShow = (immerse: ImmerseInterface) => {
    // let hour = immerse.duration.hour <= 9 ? '0' + immerse.duration.hour : immerse.duration.hour,
    // min = immerse.duration.min <= 9 ? '0' + immerse.duration.min : immerse.duration.min
    return `${numberToCN(immerse.duration.hour)}时${numberToCN(immerse.duration.min)}分${numberToCN(immerse.duration.sec)}秒`
  },
  mountedEntry = async() => {
    await initImmerseDB()
    intervalID = setInterval(() => timeFliesFast(pgInfo.immerse.duration), 1000)
  }

onMounted(() => mountedEntry())

onUnmounted(() => clearInterval(intervalID))

watch(pgInfo.immerse, (newImmerse) => autoSaveImmerse(newImmerse))
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
