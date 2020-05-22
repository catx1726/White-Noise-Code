<template>
  <div class="header-container">
    <div class="logo">WhiteNoise</div>
    <v-btn
      v-for="item in navList"
      :id="item.text"
      :key="item.link"
      text
      :to="item.link"
      color="white"
    >
      {{ item.text }}
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyHeader',

  components: {},
  data() {
    return {
      DOC: {},
      ui: true,
      navList: []
    }
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.DOC = document
    const uiBtn = this.DOC.querySelector('#UI')
    uiBtn.addEventListener('click', this.showUI)
  },

  created() {
    this.navList = this.getNavList()
  },
  methods: {
    showUI() {
      const container = this.DOC.querySelector('.content-container')
      const logo = this.DOC.querySelector('.logo')
      this.ui = !this.ui
      const tempOpcity = this.ui ? '1' : '0'
      container.style = 'opacity:' + tempOpcity
      logo.style = 'opacity:' + tempOpcity
    },
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
  .logo {
    color: white;
    padding-left: 20px;
    user-select: none;
    font-size: 25px;
    flex-grow: 1;
    position: relative;
    transition: all 0.3s ease;
  }
}
</style>
