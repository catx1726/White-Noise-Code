<template>
  <main class="info-container ">
    {{ pgInfo.season?.text }}
  </main>
</template>

<script lang="ts">
export default {
  name: 'InfoComp'
}
</script>
<script lang="ts" setup>
import { reactive } from 'vue'
import { getDayPart, getSeason } from '../..'

const pgInfo = reactive({ season: getSeason(), dayPart: getDayPart() })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
