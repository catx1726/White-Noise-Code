<template>
  <main class="info-container text-white">
    {{ pgInfo.season?.text }}
    <router-link :to="pgInfo.syncPath.uri">{{ pgInfo.syncPath.text }}</router-link>
  </main>
</template>

<script lang="ts">
export default {
  name: 'InfoComp'
}
</script>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getDayPart, getSeason } from '../..'

const pgInfo = reactive({ season: getSeason(), dayPart: getDayPart(), syncPath: { uri: '/about', text: '关于' } }),
  handleRoute = () => {
    if (useRoute().fullPath !== '/about') return
    pgInfo.syncPath = { text: '首页', uri: '/' }
    console.log('handleRoute:', useRoute().fullPath)
  }
onMounted(handleRoute)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
