import Vue from 'vue';
import Vuex from 'vuex';
import articleBanner from '@/store/article/banner';
import articleCard from '@/store/article/card';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articleBanner,
    articleCard
  }
});