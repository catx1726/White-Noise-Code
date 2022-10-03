<template>
  <svg :class="svgClass" v-bind="attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

const props = defineProps({ name: { type: String, require: true }, cusClass: { type: Array, require: false } }),
  attrs = useAttrs(),
  iconName = computed(() => `#icon-${props.name}`),
  svgClass = computed(() => {
    if (props.name) {
      return 'svg-icon ' + (props.cusClass || '')
    } else {
      return 'svg-icon'
    }
  })
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
