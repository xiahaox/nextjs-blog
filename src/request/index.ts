import axios from 'axios';
import { message } from 'antd';
// console.log("-----axios", process.env.NODE_ENV);
// console.log("-----axios", process.env.NEXT_API_URL);

const httpProvider = axios.create({
  // baseURL: "http://localhost:3000/",
  // baseURL: "http://localhost:4000/",
  // baseURL: "/",
  baseURL:  process.env.NEXT_API_URL,
  timeout: 60000,
  // withCredentials: true,
});
httpProvider.interceptors.request.use(
  (config) => {
    return config;
  },

  () => {
    throw new Error('发起请求出错');
  }
);
httpProvider.interceptors.response.use(
  (data) => {
    if (data.status && +data.status === 200 && data.data.status === 'error') {
      typeof window !== 'undefined' && message.error({ message: data.data.msg });
      return null;
    }
    if (data.status !== 200) {
      message.error(data.status);
      return null;
    }
    const res = data.data;
    return res;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 504:
        case 404:
          typeof window !== 'undefined' && message.error('服务器异常');
          break;

        default:
          typeof window !== 'undefined' &&
            message.error(
              (err.response && err.response.data && err.response.data.msg) || '未知错误!'
            );
      }
    }

    return Promise.reject(err);
  }
);


export default httpProvider