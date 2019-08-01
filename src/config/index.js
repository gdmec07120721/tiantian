(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://tiantiantui.top';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;

  //回调url
  window.SITE_CONFIG['redirect_uri']  = 'http://tiantiantui.top/'; 

  //微信appId
  window.SITE_CONFIG['weixin_appid']  = 'wxd5c2cc2ea615ff8e'; 
})();
