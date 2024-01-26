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

  error => {
    message.error('bed request')
    Promise.reject(error)
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
    console.log(err,"==err");
    console.log(err.response);
    
    if (err.response) {
      const { status, data } = err.response
      switch (status) {
        case 401:
          message.error((data && data.message) || '登录信息过期或未授权，请重新登录！')
          break

        default:
          message.error(data.message || data.err ||`连接错误 ${status}！`)
          break
      }
    } else {
      message.error(err.message)
    }

    return Promise.reject(err);
  }
);


export default httpProvider