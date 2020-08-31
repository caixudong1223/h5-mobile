import { getToken } from './cookie'
import router from '../router/index'
import store from '../store/index'

// 权限控制
router.beforeEach((to, from, next) => {
  if (to.path == "/mobile") {
    //如果是访问登录页 直接放行
    return next();
  }

  // const token = getToken();
  const token = store.getters.token;

  if (!to.meta.requireAuth) {
    //如果meta里面不存在requireAuth 也就是我其他路由没有设置requireAuth 都是不需要登录就可以访问的  直接放行
    next();
  } else {
    //如果存在requireAuth
    if (token) {
      //如果存在token 说明你已经登录 直接放行
      next();
    } else {
      //如果不存在token 说明你还没登陆
      next({
        path: "/mobile", //跳转登录页
        query: {
          redirect: to.fullPath, //记录当前是从哪里跳过去的   在登录后直接返回原来的页面
        },
      });
    }
  }
});
