<template>
  <transition>
    <main v-if="pgInfo.show" class="custom-source-container flex items-center justify-center">
      <div v-if="pgInfo.show" class="modal" @click="pgInfo.show = false" />
      <div class="custom-box">
        <div class="item">
          <span class="title">归属:</span>
          <select v-model="pgInfo.val.type">
            <option v-for="item of pgInfo.types" :key="item.enum" :value="item">{{ item.title }}</option>
          </select>
        </div>
        <div class="item">
          <span class="title">链接:</span>
          <input v-model="pgInfo.val.link" type="text" placeholder="请输入链接" />
        </div>
        <div class="item">
          <span class="title">名字:</span>
          <input v-model="pgInfo.val.text" type="text" placeholder="指定一个名称" />
        </div>
        <div class="flex justify-between mt-8">
          <div class="cursor-pointer" @click="pgInfo.show = false">无事</div>
          <div class="cursor-pointer" @click="submit">确认</div>
        </div>
      </div>
    </main>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'CustomSourceComp'
}
</script>
<script lang="ts" setup>
import { Info } from '@/components/info_box'
import { reactive } from 'vue'
import { AudioSourceTypeList, type AudioSourceListType, type AudioSourceType } from '../source_list'

export interface PageConfigInterface {
  pgInfo: { show: boolean; val: AudioSourceListType }
}

const pgInfo = reactive({ show: false, val: { link: '', type: AudioSourceTypeList.Custom, text: '' } as AudioSourceListType, types: AudioSourceTypeList }),
  emit = defineEmits(['add-source-list']),
  submit = () => {
    console.log('submit:', pgInfo.val)
    emit('add-source-list', pgInfo.val)
    pgInfo.show = false
    pgInfo.val = { link: '', type: AudioSourceTypeList.Custom, text: '' } as AudioSourceListType
    Info({ message: '已添加', type: 'info', duration: 2000, show: true })
  }

defineExpose({ pgInfo })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
