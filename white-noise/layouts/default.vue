<template>
  <v-app :style="'background-image: url(' + './imgs/' + bgImg + ')'" class="app-container">
    <MyHeader />
    <Nuxt class="content-container" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from '~/components/MyHeader'

export default {
  components: {
    MyHeader
  },
  data() {
    return {}
  },
  computed: mapState({
    bgImg: (state) => state.container.bgImg
  }),
  watch: {
    bgImg(val) {
      return val
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.app-container {
  // background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.content-container {
  height: 80vh;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: white;
  transition: all 0.3s ease;
}
</style>
