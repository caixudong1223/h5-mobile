import store from '../store/index'
import { showGlobalErrorToast, showGlobalLoading } from './httpCompUtil'

export default (error) => {
    if (!error.response) {
        showGlobalErrorToast(error.response, '网络请求异常', false);
        showGlobalLoading(error.response && error.response.config, 'closed');
        return Promise.reject({
            msg: '网络连接超时',
            error
        });
    };

    let msg = '';
    const status = error.response.status;
    // HTTP状态码-判断
    switch (status) {
        case 400:
            msg = '错误的请求参数';
            break;
        case 401:
            msg = '没有该操作权限';
            break;
        case 403:
            msg = '请登录';
            break;
        case 404:
            msg = '错误的请求地址';
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            msg = '服务异常';
            break;
        default:
            msg = '未知错误' + status;
    }

    showGlobalErrorToast(error.response, msg);
    showGlobalLoading(error.response.config, 'closed');
    return Promise.reject({
        msg,
        error
    });
}