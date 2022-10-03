<template>
  <main class="source-list-container flex justify-between">
    <div v-for="item of pgInfo.sourceTypeList" :key="item.enum" class="source-item">
      <span class="title text-2xl">{{ item.title }}</span>
      <pre class="text">{{ item.text }}</pre>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'SourceListComp'
}
</script>
<script lang="ts" setup>
import { AudioSourceTypeList } from '.'

import { reactive } from 'vue'

const pgInfo = reactive({ sourceTypeList: AudioSourceTypeList })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
