<template>
  <main class="index-container">
    <div class="test-nonblur">
      <SourceList />
    </div>
  </main>
</template>

<script>
import SourceList from '~/components/SourceList'
export default {
  components: {
    SourceList
  },
  data() {
    return {
      title: 'Home'
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  min-height: 80vh;
  margin-top: 10vh;
  margin-bottom: 10vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  // background-image: url('/imgs/window-831251_1920.jpg');
  .test-nonblur {
    z-index: 1;
    overflow: hidden;
    color: white;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      // test dev branch
      // margin: -30px;
      // filter: blur(5px);
      // background-attachment: fixed;
      // background-size: cover;
      // background-position: center;
      background-color: rgba(0, 0, 0, 0.8);

      // background-image: url('/imgs/window-831251_1920.jpg');
    }
  }
}
</style>
