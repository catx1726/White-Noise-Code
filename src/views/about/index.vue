<template>
  <main class="about-container text-white" v-html="AboutMD" />
  <info-comp />
</template>

<script lang="ts">
export default {
  name: 'AboutPage'
}
</script>
<script lang="ts" setup>
import { AboutMD } from '.'
import InfoComp from '../home/components/info/index.vue'
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
