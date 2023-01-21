<template>
  <main class="nothing-here-comp-container">
    <slot>
      <span class="default-content">暂无数据</span>
    </slot>
  </main>
</template>

<script lang="ts">
export default {
  name: 'NohingHereComp'
}
</script>
<script lang="ts" setup></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
