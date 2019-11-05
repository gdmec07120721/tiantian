(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://www.tiantiantui.top';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;

  //回调url
  window.SITE_CONFIG['redirect_uri']  = 'http://www.tiantiantui.top/tiantian/'; 

  //微信appId
  window.SITE_CONFIG['weixin_appid']  = 'wxa70ae3f6258db5f4'; 

  //微信secret
  window.SITE_CONFIG['weixin_secret']  = 'wxd5c2cc2ea615ff8e'; 

  //微信公众号链接
  window.SITE_CONFIG['oa_url'] = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2OTk2Nzk0Mg==&scene=110#wechat_redirect';
})();
