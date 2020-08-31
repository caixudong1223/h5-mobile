import { getToken } from "../utils/cookie";

// 全局state
export const globalState = {
  token: getToken(), // 用户token
  phone: "",
};

// 全局actions
export const globalActions = {};

// 全局mutations
export const globalMutations = {
  updateToken(state, val) {
    state.token = val;
  },
  updatePhone(state, val) {
    state.phone = val;
  },
};

// 全局getters
export const globalGetters = {
  token: (state) => state.token,
  phone: (state) => state.phone,
};

export default {
  globalState,
  globalActions,
  globalMutations,
  globalGetters,
};
