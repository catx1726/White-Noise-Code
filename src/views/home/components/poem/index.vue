<template>
  <main class="poem-container">
    <pre>{{ pgInfo.poem.content }}</pre>
  </main>
</template>

<script lang="ts">
export default {
  name: 'PoemComp'
}
</script>
<script lang="ts" setup>
import { getPoem } from '.'
import { reactive } from 'vue'

const pgInfo = reactive({ poem: getPoem() })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
