export const state = () => ({
  navList: [{ link: '/', text: 'Home' }, { link: '/about', text: 'About' }, { text: 'UI' }]
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
