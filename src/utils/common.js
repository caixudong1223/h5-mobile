/**
 * @description 判断是否是微信浏览器
 */
export const isWeiXin = function() {
  var rst = true;
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    var ua = navigator.userAgent.toLowerCase();
    if (!(ua.match(/MicroMessenger/i) == "micromessenger")) {
      rst = false;
    }
  } else {
    rst = false;
  }
  return rst;
};

/**
 * @description 验证手机号
 */
export const validateMobile = function(s) {
  return /^1[3456789]\d{9}$/.test(s);
};
