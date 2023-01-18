<template>
  <main class="poem-container flex">
    <span v-show="!pgInfo.dialogShow" class="cursor-pointer icon text-sm" @click="pgInfo.dialogShow = true">{{ '详' }}</span>
    <div class="poem-content" v-html="pgInfo.poem.content" />

    <transition>
      <div v-show="pgInfo.dialogShow" class="poem-detail-dialog-container">
        <div class="modal" @click="pgInfo.dialogShow = false" />
        <div class="poem-detail-box text-center">
          <span class="cursor-pointer icon text-sm" @click="pgInfo.dialogShow = false">{{ '关' }}</span>
          <div class="title-author-dynasty flex flex-col items-center">
            <span class="title text-center text-lg">《{{ pgInfo.poem.title }}》</span>
            <div class="flex justify-center">
              <span class="dynasty">{{ pgInfo.poem.dynasty }}</span>
              <span class="author">{{ pgInfo.poem.author }}</span>
            </div>
          </div>
          <div class="flex justify-center text-justify cursor-pointer poem-content" @click="copyThat(pgInfo.poem.content)" v-html="pgInfo.poem.content" />
          <div v-show="pgInfo.poem.translate" class="flex justify-center text-justify cursor-pointer poem-content" @click="copyThat(pgInfo.poem.translate)">
            译文: {{ pgInfo.poem.translate }}
          </div>
        </div>
      </div>
    </transition>
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
import { copyThat } from '@/utils/index'

const pgInfo = reactive({ poem: {} as PoemType, dialogShow: false })

onMounted(() => getPoem(pgInfo))
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
