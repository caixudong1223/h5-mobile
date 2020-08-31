import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "home" */ "@/page/Home.vue");
const Mobile = () =>
  import(/* webpackChunkName: "mobile" */ "@/page/Mobile.vue");
const Result = () =>
  import(/* webpackChunkName: "result" */ "@/page/Result.vue");
const UserInfo = () =>
  import(/* webpackChunkName: "userInfo" */ "@/page/UserInfo.vue");
const Authorization = () =>
  import(/* webpackChunkName: "authorization" */ "@/page/authorization.vue");
const My = () => import(/* webpackChunkName: "my" */ "@/page/My.vue");
const News = () => import(/*  webpackChunkName: "news" */ "@/page/news.vue");
const NewsDetail = () =>
  import(/*  webpackChunkName: "newsDetail" */ "@/page/newsDetail.vue");
const VideoList = () =>
  import(/*  webpackChunkName: "Video" */ "@/page/VideoList.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: true,
      showFooter: true,
    },
  },
  {
    path: "/my",
    name: "My",
    component: My,
    meta: {
      keepAlive: false,
      showFooter: true,
    },
  },
  {
    path: "/mobile",
    name: "Mobile",
    component: Mobile,
    meta: {
      keepAlive: false,
      showFooter: false,
    },
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
    meta: {
      keepAlive: false,
      showFooter: false,
      requireAuth: true
    },
  },
  {
    path: "/userInfo",
    name: "UserInfo",
    component: UserInfo,
    meta: {
      keepAlive: false,
      showFooter: false,
    },
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: Authorization,
    meta: {
      keepAlive: false,
      showFooter: false,
    },
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      keepAlive: true,
      showFooter: false,
      
    },
  },
  {
    path: "/newsDetail",
    name: "NewsDetail",
    component: NewsDetail,
    meta: {
      keepAlive: false,
      showFooter: false,
    },
  },
  {
    path: "/video-list",
    name: "VideoList",
    component: VideoList,
    meta: {
      keepAlive: false,
      showFooter: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/game/",
  routes,
});

export default router;
