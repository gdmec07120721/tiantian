import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/index';
import store from '@/store/index';
import { Toast } from 'vant';
import WEIXINCON from '@/config/weixinConfig';


Vue.use(Router);

const url = require('url');
const queryString = require('querystring');
const router = new Router(routes);

function getUserInfo(code) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http({
      url: '/user/getUserInfo',
      method: 'get',
      data: Vue.prototype.$http.adornData({
        app_id: window.SITE_CONFIG.weixin_appid,
        code: code
      })
    }).then(res => {
      if (res && res.errcode === 0) {
        resolve(res.result_rows[0]);
      } else {
        reject(res.errmsg);
      }
    });
  });
}

router.beforeEach((to, from, next) => {
  let mobile = store.getters['user/user'].mobile;
  let uid = store.getters['user/user'].uid;
  
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
  } else {
    if (mobile && uid) {
      next();
    } else if (!mobile && uid) {
      next({
        path: '/login',
        query: { redirect_uri: to.fullPath }
      });
    } else {
      let url_parse = url.parse(window.location.href);
      let code = queryString.parse(url_parse.query).code || to.query.code;
      let state = queryString.parse(url_parse.query).state || to.query.state;
    
      if (Vue.prototype.$userAgent.browser == 'weixin') {
        //判断用户是否有同意授权
        if (!!code && !!state) {
          //获取openId
          getUserInfo(code)
            .then(res => {
              setUserInfo(res.result_rows[0]);
              setWxConfig(res.result_rows[0]);
              next();
            })
            .catch(errmsg => {
              Toast('请关注企业号' + errmsg);
            }); 
        } else {
          toWeixin(to.fullPath);
        }
      } else {
        //提示请在哪里哪里打开
        toWeixin(to.fullPath);
      }
    }
  }


});

function toWeixin(redirect_path) {
  //拉起微信授权登录页面
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.SITE_CONFIG.weixin_appid}&redirect_uri=${encodeURI(redirect_path)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
}

function setUserInfo (user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

function setWxConfig(config) {
  let wx_config = Object.assign({}, WEIXINCON, {
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: window.SITE_CONFIG.weixin_appid, // 必填，公众号的唯一标识
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature
  });
  // wx.config(wx_config);
}

export default router;
