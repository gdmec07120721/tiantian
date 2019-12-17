import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/index';
import store from '@/store/index';

Vue.use(Router);

const url = require('url');
const queryString = require('querystring');
const router = new Router(routes);

function getUserInfo(code) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http({
      url: Vue.prototype.$http.adornUrl('/user/query_wei_xin_user_info'),
      method: 'get',
      data: Vue.prototype.$http.adornParams({
        code: code,
        url: window.SITE_CONFIG.redirect_uri
      })
    }).then(res => {
      if (res && res.retcode === 0) {
        resolve(res.result_rows[0]);
      } else {
        reject(res.retmsg);
      }
    });
  });
}

function setTitle(to) {
  let title = '';
  
  if (to.matched.some(record => record.meta.title)) {
    title = '天天推 - ' + to.meta.title; 
  } else {
    title =  '天天推';
  }

  let title_els = document.getElementsByTagName('title');

  title_els[0].innerText = title;
}

router.beforeEach((to, from, next) => {
  
  let uid = store.getters['user/user'].uid;
  setTitle(to);
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
  } else {
    if (uid) {
      next();
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
              console.log(res);
              setUserInfo({ ...res, code });
              
              if (!to.matched.some(record => record.meta.login)) {
                next();
              } else if (!res.mobile && !res.uid) {
                next({
                  path: '/login',
                  query: { redirect_uri: to.fullPath }
                });
              } else {
                next();
              }
            })
            .catch(errmsg => {
              toWeixin(to.fullPath);
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

function encodeURI(redirect_path) {
  return encodeURIComponent(`${window.SITE_CONFIG.redirect_uri}#${redirect_path}`);
}

function toWeixin(redirect_path) {
  //拉起微信授权登录页面
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.SITE_CONFIG.weixin_appid}&redirect_uri=${encodeURI(redirect_path)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
}

function setUserInfo (user) {
  store.commit('user/updatedUser', user);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export default router;
