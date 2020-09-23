import http from "../utils/http";
import api from "./base";
export default {
  getSmsCode: (data) =>
    http.post(`${api.base}/hellozj-login/sms/getSmsCode`, data),
  login: (data) =>
    http.post(`${api.base}/hellozj-game/noAuth/game/login`, data),
  queryGamePersonnel: (data) =>
    http.post(`${api.base}/hellozj-game/noAuth/game/queryGamePersonnel`, data, {
      noAuth: false,
      hideLoading: true,
    }),
  saveGamePersonnel: (data) =>
    http.post(`${api.base}/hellozj-game/noAuth/game/saveGamePersonnel`, data),
  getActivityArea: (data) =>
    http.post(`${api.base}/hellozj-game/noAuth/game/area/query`, data),
  queryCityAreaInfoList: (data) =>
    http.post(`${api.base}/hellozj-admin/areaInfo/queryCityAreaInfoList`, data),
  getWechatAuthorizeUrl: (data) =>
    http.post(`${api.base}/hellozj-login/user/getWechatAuthorizeUrl`, data),
  judgeEngineerOfficialAccount: (data) =>
    http.post(
      `${api.base}/hellozj-login/wechat/judgeEngineerOfficialAccount`,
      data
    ),
  pageNews: (data) =>
    http.post(`${api.base}/hellozj-game/game/info/page`, data, {
      hideLoading: true,
      noAuth: true,
    }),
  getNews: (data) =>
    http.post(`${api.base}/hellozj-game/game/info/select`, data, {
      noAuth: true,
    }),
  logout: () =>
    http.get(
      `${api.base}/hellozj-game/noAuth/game/logout`,
      {},
      {
        noAuth: false,
        hideLoading: true,
      }
    ),
};
