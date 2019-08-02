const state = {
  business_card: {}
};

const mutations = {
  saveBusinessCard(state, business_card) {
    state.business_card = business_card;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};