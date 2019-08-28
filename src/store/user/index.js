const state = {
  user: {}
};

const mutations = {
  updatedUser(state, user) {
    state.user = user;
  }
};

const getters = {
  user(state) {
    let user = state.user.uid ? state.user : (JSON.parse(sessionStorage.getItem('user')) || {});

    return user;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};