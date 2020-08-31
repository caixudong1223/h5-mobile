import Vue from "vue";
import Vuex from "vuex";
// import createLogger from 'vuex/dist/logger'
import { globalState, globalActions, globalMutations, globalGetters } from './globalStore'

// 引入全局存储
// import * as actions from './action';
// import * as mutations from './mutation';
// import * as getters from './getter';

// 引入模块存储



Vue.use(Vuex);

export default new Vuex.Store({
  state: globalState,
  actions: globalActions,
  getters: globalGetters,
  mutations: globalMutations
});
