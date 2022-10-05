<template>
  <main class="poem-container flex">
    <div v-html="pgInfo.poem.content" />
  </main>
</template>

<script lang="ts">
export default {
  name: 'PoemComp'
}
</script>
<script lang="ts" setup>
import { getPoem, type PoemType } from '.'
import { onMounted, reactive } from 'vue'

const pgInfo = reactive({ poem: {} as PoemType })

onMounted(() => getPoem(pgInfo))
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
