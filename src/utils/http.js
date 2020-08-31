import axios from "axios";
import store from "../store/index";
import httpErrorHandler from "./httpErrorHandler";
import httpResponseFilter from "./httpResponseFilter";
import { showGlobalLoading } from "./httpCompUtil";

// 创建Axios实例
const instance = axios.create({
  timeout: 1000 * 60,
  validateStatus: function(status) {
    return status >= 200 && status < 500;
  },
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 请求队列
const queue = [];

// Ajax中断
const CancelToken = axios.CancelToken;

// 生成Token
const genToken = (config) => {
  // 拼接请求的url和方法，同样的url+方法即视为相同的请求
  return `${config.url}_${config.method}`;
};

// 中断重复的请求，并从队列中移除
const removeQueue = (config) => {
  for (let i = 0, size = queue.length; i < size; i++) {
    const task = queue[i];
    if (task && task.token === genToken(config)) {
      // 若全局Loading已打开，则需要关闭Loading
      showGlobalLoading(config, "closed");
      task.cancel();
      queue.splice(i, 1);
    }
  }
};

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 中断之前的同名请求
    removeQueue(config);

    // 添加cancelToken
    config.cancelToken = new CancelToken((c) => {
      queue.push({ token: genToken(config), cancel: c });
    });

    // 默认全局loading,取消请传入{hideLoading:true}
    showGlobalLoading(config, "open");

    if (!config.noAuth && store.getters.token) {
      config.headers["Authorization"] = store.getters.token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use((response) => {
  // 请求完成，移出队列
  removeQueue(response.config);

  // 业务错误过滤
  httpResponseFilter(response);

  // 返回请求数据
  return Promise.resolve(response.data);
}, httpErrorHandler);

let defaultConfig = {
  hideLoading: false,
  hideError: false,
  noRedirect: false,
  noAuth: true,
};

/**
 * 封装后的ajax post方法
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数
 * @param {object} config 用户自定义设置
 * @returns
 */
export function post(url, data, config = {}) {
  return instance.post(url, data, { ...defaultConfig, ...config });
}

/**
 * 封装后的ajax get方法
 *
 * @param {string} url 请求路径
 * @param {object} params 请求参数
 * @param {object} config 用户自定义设置
 * @returns
 */
export function get(url, params, config = {}) {
  return instance.get(url, { params }, { ...defaultConfig, ...config });
}

// 默认导出实例
export default instance;
