import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "home" */ "@/page/Home.vue");
const Authorization = () =>
  import(/* webpackChunkName: "authorization" */ "@/page/authorization.vue");
const My = () => import(/* webpackChunkName: "my" */ "@/page/My.vue");

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
    path: "/authorization",
    name: "Authorization",
    component: Authorization,
    meta: {
      keepAlive: false,
      showFooter: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
