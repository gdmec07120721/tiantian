import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from '@/utils/http';
import userAgent from '@/utils/userAgent';
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/common.css';
import './config';
import { Lazyload } from 'vant';

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(Lazyload);

// 挂载全局
Vue.prototype.$http = http; // ajax请求方法
Vue.prototype.$userAgent = userAgent;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
