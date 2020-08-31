import router from "../router/index";
import store from "../store/index";
import Cookies from "js-cookie";
import { showGlobalErrorToast } from "./httpCompUtil";

export default (response) => {
  // let fromPath = encodeURIComponent(router.history.current.fullPath)
  // let needRedirect = response && !response.config.noRedirect
  // console.log('httpResponseFilter >>>', response, ',current page: ', fromPath, ',needRedirect: ', needRedirect)

  let status = response.status;
  // 业务状态码-判断
  switch (status) {
    case 401: // 401: 未登录
    //   showGlobalErrorToast(response, "登录过期，请重新登录");
      store.commit("updateToken", null);
      Cookies.remove("access_token");
      break;
    case 402:
      showGlobalErrorToast(response, "登录过期，请重新登录");
      store.commit("updateToken", null);
      Cookies.remove("access_token");
      break;
    case 404: // 404请求不存在
      showGlobalErrorToast(response, "请求的资源不存在");
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      showGlobalErrorToast(response, "服务器错误");
      break;
  }
};
