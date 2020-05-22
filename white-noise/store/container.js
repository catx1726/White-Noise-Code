export const state = () => ({
  bgImg: 'window.jpg'
})

export const getters = {
  getBgImg: (state) => {
    return state.bgImg
  }
}

export const mutations = {
  CHANGE_BG_IMG: (state, img) => {
    console.log('mutations img:', img)
    state.bgImg = img
  }
}

export const actions = {
  changeBgImg({ commit }, img) {
    console.log('actions img:', img)
    commit('CHANGE_BG_IMG', img)
  }
}
