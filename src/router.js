import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import routes from '@/router/index';
import { Toast } from 'vant';
import WEIXINCON from '@/config/weixinConfig';


Vue.use(Router);

const url = require('url');
const queryString = require('querystring');
const router = new Router(routes);

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
        resoleve(res.result_rows[0]);
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

router.beforeEach((to, from, next) => {
  next();
 
  // let url_parse = url.parse(window.location.href);
  // let code = queryString.parse(url_parse.query).code || to.query.code;
  // let state = queryString.parse(url_parse.query).state || to.query.state;

  // if (Vue.prototype.$userAgent.browser == 'weixin') {
  //   //判断用户是否有同意授权
  //   if (!!code && !!state) {
  //     //登录
  //     login({ code: code })
  //       .then(res => {
  //         //设置token到herder
  //         setToken(res.token);
  //         //需要后台返回access_token 在基础接口配置需要用到
  //         window.SITE_CONFIG.access_token = res.access_token;
  //         getJsapiTicket();
  //         next();
  //       })
  //       .catch(() => {
  //         //拉起微信授权登录页面
  //         openWeixin(to.fullPath);
  //       }); 
  //   } else {
  //     openWeixin(to.fullPath);
  //   }
  // } else {
  //   //提示请在哪里哪里打开
  //   openWeixin();
  // }
});

function openWeixin(redirect_path) {
  //拉起微信授权登录页面
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.SITE_CONFIG.weixin_appid}&redirect_uri=${encodeURI(redirect_path)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
}

async function getJsapiTicket() {
  Vue.prototype.$http({
    url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    method: 'post',
    data: Vue.prototype.$http.adornData({
      access_token: window.SITE_CONFIG.access_token,
      type: 'jsapi'
    })
  }).then(res => {
    if (res && res.errcode === 0) {
      window.SITE_CONFIG.ticket = res.ticket;
    } else {
      Toast(res.errmsg);
    }
  });
}

sha1Signature(ticket) {
  let signature = '', 
      string = `jsapi_ticket=${ticket}`;

  for (let i in WEIXINCON) {
    string += `${i}=${WEIXINCON[i]}`
  }

  string += `url=${window.SITE_CONFIG.baseUrl}`

  signature = sha1(string)
  
}

export default router;
