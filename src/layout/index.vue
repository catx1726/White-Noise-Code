<template>
  <main class="layout-container" :style="`background-image:url(${pgInfo.background?.link})`">
    <router-view />
  </main>
</template>

<script lang="ts">
export default {
  name: 'LayoutPage'
}
</script>
<script lang="ts" setup>
import { getBackground } from '@/views/home'
import { onDeactivated, onMounted, reactive } from 'vue'
import { RouterView } from 'vue-router'
const pgInfo = reactive({ background: getBackground(), timer: 0 }),
  refreshHandler = (duration: number) => {
    clearInterval(pgInfo.timer)
    pgInfo.timer = setInterval(() => {
      pgInfo.background = getBackground()
      console.log('refreshHandler:', pgInfo.timer, pgInfo.background)
    }, duration)
  }

onMounted(() => {
  refreshHandler(1000 * 60 * 30)
  console.log('setup onMounted:', pgInfo.background)
})

onDeactivated(() => {
  clearInterval(pgInfo.timer)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
