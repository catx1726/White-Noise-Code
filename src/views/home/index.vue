<template>
  <main class="main-container flex flex-col justify-end text-white">
    <poem-comp />
    <source-list-comp />
    <info-comp />
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>

<script setup lang="ts">
import InfoComp from './components/info/index.vue'
import SourceListComp from './components/source_list/index.vue'
import PoemComp from './components/poem/index.vue'
</script>

<style scoped>
@import './index.scss';
</style>
