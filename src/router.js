import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/index';
import { Toast } from 'vant';
import WEIXINCON from '@/config/weixinConfig';


Vue.use(Router);

const url = require('url');
const queryString = require('querystring');
const router = new Router(routes);

router.beforeEach((to, from, next) => {
  next();
  return false;
  let url_parse = url.parse(window.location.href);
  let code = queryString.parse(url_parse.query).code || to.query.code;
  let state = queryString.parse(url_parse.query).state || to.query.state;

  if (Vue.prototype.$userAgent.browser == 'weixin') {
    //判断用户是否有同意授权
    if (!!code && !!state) {
      //获取openId
      getOpenId(code, state)
        .then(res => {
          setOpenId(res.data.openid);
          next();
        })
        .catch(errmsg => {
          Toast('没有openid' + errmsg);
        }); 
    } else {
      toWeixin(to.fullPath);
    }
  } else {
    //提示请在哪里哪里打开
    toWeixin(to.fullPath);
  }
});

function toWeixin(redirect_path) {
  //拉起微信授权登录页面
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.SITE_CONFIG.weixin_appid}&redirect_uri=${encodeURI(redirect_path)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
}

function getOpenId(code, state) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http({
      url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      method: 'get',
      data: Vue.prototype.$http.adornData({
        appid: window.SITE_CONFIG.weixin_appid,
        secret: window.SITE_CONFIG.weixin_secret,
        code: code,
        grant_type: 'authorization_code'
      })
    }).then(res => {
      if (res && res.errcode === 0) {
        resolve(res.data.openid);
      } else {
        reject(res.errmsg);
      }
    });
  });
}

function setOpenId (openid) {
  sessionStorage.setItem('openid', openid);
}

// async function getJsapiTicket() {
//   Vue.prototype.$http({
//     url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
//     method: 'post',
//     data: Vue.prototype.$http.adornData({
//       access_token: window.SITE_CONFIG.access_token,
//       type: 'jsapi'
//     })
//   }).then(res => {
//     if (res && res.errcode === 0) {
//       window.SITE_CONFIG.ticket = res.ticket;
//       setWxConfig(window.SITE_CONFIG.ticket);
//     } else {
//       Toast(res.errmsg);
//     }
//   });
// }

// function setWxConfig(config) {
//   wx.config(Object.assign({}, WEIXINCON, config, {
//     debug: true // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   }));
// }

export default router;
