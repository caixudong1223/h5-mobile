import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import api from "./api/index";
import './utils/permission'

import {
  NavBar,
  Button,
  Toast,
  Icon,
  Field,
  Cell,
  RadioGroup,
  Radio,
  Popup,
  DatetimePicker,
  Picker,
  Tabbar,
  TabbarItem,
  List,
  PullRefresh,
  Image,
  Dialog
} from "vant";

Vue.use(NavBar).use(Button).use(Toast).use(Icon).use(Field).use(Cell).use(RadioGroup).use(Radio).use(Popup).use(DatetimePicker).use(Picker).use(Tabbar).use(TabbarItem).use(List).use(PullRefresh).use(Image).use(Dialog)

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
