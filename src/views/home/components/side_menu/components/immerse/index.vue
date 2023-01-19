<template>
  <main class="immerse-container flex justify-between">
    <div>
      <input v-model="pgInfo.immerseName" autocomplete="on" type="text" placeholder="沉浸于何事" />
      <button class="immerse-button" @click="pgInfo.immerse = startNewImmerse(pgInfo.immerseName, pgInfo.immerse)">即刻起</button>
    </div>
    <span class="timer">{{ handleTimerShow(pgInfo.immerse) }}</span>
  </main>
</template>

<script lang="ts">
export default {
  name: 'ImmerseComp'
}
</script>
<script lang="ts" setup>
import { reactive, onMounted, watch, onUnmounted } from 'vue'
import { timeFliesFast } from '@/utils/index'
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
    return `${immerse.duration.hour}时${immerse.duration.min}分`
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
