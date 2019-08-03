import axios from 'axios';
import qs from 'qs';

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token');

  if (token) {
    config.headers['X-Xht-Authorization'] = token; // 请求头带上token
  }

  config.headers['X-Xht-Timestamp'] = new Date().getTime() / 1000;
  config.headers['X-Xht-AppVersion'] = '2.0.0';
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
});

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 */
http.adornParams = (params = {}) => {
  return params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, contentType = 'json') => {
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data);
};

export default http;
