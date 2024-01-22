// import router from '@/router';
import axios from 'axios';
import { getToken, setToken } from '@/utils/auth';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
// import { reactive } from 'vue';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

// 创建一个axios实例对象，主要内容包括baseUrl、超时等内容
const request = axios.create({
  // baseURL: 'http://118.126.88.189:8081/',
  baseURL: 'https://www.gzcdgd.com/trans/v2/',
  withCredentials: true, //允许跨域携带cookie
  timeout: 20000, //设置超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    ElLoading.service({
      spinner: '',
      text: '',
      background: 'rgba(255, 255, 255, 0.5)',
    });
    // 主要是配置一些发送请求前需要做的事情，比如是否已经登录，是否登录已经失效等处理
    // config.headers!.Authorization = sessionStorage.getItem(
    //   'Authorization'
    // ) as any;
    // config.headers!.Authorization = '0c834b9714d04e009af8a77550552f76'
    // 调用完微信接口后从url里获取token，并放到cookies里面
    if (location.href.includes('token')) {
      setToken(location.href.slice(location.href.indexOf('token') + 6));
    }
    if (location.href.includes('?_time')) {
      location.assign(location.href.slice(0, location.href.indexOf('?_time')));
    }
    config.headers!.Authorization = getToken();
    return config;
  },
  (error) => {
    ElLoading.service().close();
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    ElLoading.service().close();
    // 本项目不能用状态码来判断状态是否成功
    if (res.code !== '200') {
      ElMessage({
        message: res.desc === '' ? '请联系信息化中心' : res.desc,
        type: 'error',
        showClose: true,
        duration: 10000,
      });
      // return Promise.reject(new Error(res.detail || res.msg));
      return res;
    } else {
      // 成功
      if (res.status === 'yes' || res.status === 'success') {
        return res;
      } else {
        ElMessage({
          message: res.desc,
          type: 'warning',
        });
        return res;
      }
    }
  },
  (error) => {
    ElLoading.service().close();
    return Promise.reject(error);
  }
);

export default request;
