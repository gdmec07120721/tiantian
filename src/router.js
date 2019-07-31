import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import routes from '@/router';

const url = require('url');
const queryString = require('querystring');

Vue.use(Router);

function login(data) {
  return new Promise((resoleve, reject) => {
    Vue.prototype.$http({
      url: Vue.prototype.$http.adornUrl('/v2/login'),
      method: 'post',
      data: Vue.prototype.$http.adornData({
        'data': data
      })
    }).then(res => {
      if (res && res.code === 0) {
        resoleve(res.data);
      } else {
        reject(res.msg);
      }
    });
  });
}

//设置token到herder
function setToken(token) {
  sessionStorage.setItem('token', token);
  //设置token到herder
  axios.defaults.headers.common['X-Xht-Authorization'] = token;
}

Router.beforeEach((to, from, next) => {
  let url_parse = url.parse(window.location.href);
  let code = queryString.parse(url_parse.query).code || to.query.code;
  let state = queryString.parse(url_parse.query).state || to.query.state;

  if (Vue.prototype.$userAgent.browser == 'weixin') {
    //判断用户是否有同意授权
    if (!!code && !!state) {
      //登录
      login({ code: code })
        .then(res => {
          //设置token到herder
          setToken(res.token);
          next();
        })
        .catch(() => {
          //拉起微信授权登录页面
          openWeixin(to.fullPath);
        }); 
    } else {
      openWeixin(to.fullPath);
    }
  } else {
    //提示请在哪里哪里打开
    openWeixin();
  }
});

function openWeixin(redirect_path) {
  //拉起微信授权登录页面
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.SITE_CONFIG.weixin_appid}&redirect_uri=${encodeURI(redirect_path)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
}

export default new Router(routes);
