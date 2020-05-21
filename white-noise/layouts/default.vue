<template>
  <v-app>
    <MyHeader />
    <Nuxt class="content-container" />
    <MyFooter />
  </v-app>
</template>

<script>
import MyHeader from '~/components/MyHeader'
import MyFooter from '~/components/MyFooter'

export default {
  components: {
    MyHeader,
    MyFooter
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.content-container {
  height: 80vh;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: white;
}
</style>
