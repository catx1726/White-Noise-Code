<template>
  <transition>
    <main v-if="pgInfo.show" class="info-container text-center" :class="pgInfo.type" :style="pgInfo.style">{{ pgInfo.message }}</main>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'GInfo'
}
</script>
<script lang="ts" setup>
import { reactive, type PropType } from 'vue'
import { InfoTypeEnum, type InfoInterface } from '.'

const props = defineProps({
    info: {
      type: Object as PropType<InfoInterface>,
      default: () => {
        return { show: false, message: '', duration: 3000, type: InfoTypeEnum.success, style: '' }
      }
    }
  }),
  pgInfo = reactive(props.info),
  close = (callBack: Function) => {
    pgInfo.show = false
    let timer = setTimeout(() => {
      callBack()
      clearTimeout(timer)
    }, 300)
  }

defineExpose({ close })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
