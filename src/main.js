import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/index';
import http from '@/utils/http';
import userAgent from '@/utils/userAgent';
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/config/index';
//import '@/config/weixinConfig';
import '@/assets/css/common.css';
import { Lazyload } from 'vant';

import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

//require('@/mock');

Vue.use(VueQuillEditor, /* { default global options } */);

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
