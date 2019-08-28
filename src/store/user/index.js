const state = {
  user: {}
};

const mutations = {
  saveBusinessCard(state, user) {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};