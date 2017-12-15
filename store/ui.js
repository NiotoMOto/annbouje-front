export const state = () => ({
  modals: {
    login: false,
    register: false,
    profile: false
  }
})

export const mutations = {
  toggleModal (state, { modal }) {
    for (const key in state.modals) {
      if (modal === key && !state.modals[key]) {
        state.modals[key] = true
      } else {
        state.modals[key] = false
      }
    }
  }
}
