import { Toast } from "vant";

/**
 * HTTP请求-显示全局错误Toast
 *
 * @export
 * @param {*} response 发起请求的响应
 * @param {*} message 自定义错误信息（防止响应中没有错误信息返回）
 * @param {*} must 是否强制toast
 */
export function showGlobalErrorToast(response, message, must) {
  if (response && !response.config.hideError) {
    Toast(response.data.message || message);
  } else if (message && must) {
    Toast(message);
  }
}

/**
 * HTTP请求-显示全局加载Loading
 *
 * @export
 * @param {*} config 发起请求的config
 * @param {string} [status='closed'] loading的状态
 */
export function showGlobalLoading(config, status = "closed") {
  if (config && config.hideLoading) {
    Toast.clear();
  } else {
    if (!config || !config.hideLoading) {
      status === "open" ? Toast.loading() : Toast.clear();
    }
  }
}
