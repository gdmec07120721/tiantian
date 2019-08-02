const state = {
  banner_ad: {}
};

const mutations = {
  saveBusinessCard(state, banner_ad) {
    state.banner_ad = banner_ad;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};