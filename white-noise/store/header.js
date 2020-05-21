export const state = () => ({
  navList: [
    { link: '/', text: '首页' },
    { link: '/about', text: '关于' }
  ]
})

export const getters = {
  getAllNavList: (state) => {
    return state.navList
  }
}

export const mutations = {
  /**
   *
   *
   * @param {*} state
   * @param {Object} obj(link:'/mylink',text:'mytext')
   */
  ADD_LINK: (state, obj) => {
    state.navList.push(obj)
  }
}

export const actions = {}
