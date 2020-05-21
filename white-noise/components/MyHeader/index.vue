<template>
  <div class="header-container">
    <v-btn v-for="item in navList" :key="item.link" text :to="item.link">{{ item.text }}</v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyHeader',

  components: {},
  data() {
    return {
      navList: []
    }
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {
    this.navList = this.getNavList()
  },
  methods: {
    ...mapGetters({
      getNavList: 'header/getAllNavList'
    })
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
