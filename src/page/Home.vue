<template>
  <div class="home-container">
    <div class="logo"><img src="../assets/img/logo.png" alt="" /></div>
    <div class="title"><img src="../assets/img/title.png" /></div>
    <transition name="fade">
      <div class="wrap" v-show="show">
        <div class="cell">
          <div class="cell-name">大赛指导单位：</div>
          <div class="cell-content">
            <div>江苏省人力资源和社会保障厅</div>
            <div>江苏省总工会 江苏省商务厅</div>
            <div>江苏省商业联合会</div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-name">大赛主办单位：</div>
          <div class="cell-content">
            <div>江苏省家用电器协会</div>
            <div>江苏省财贸轻纺工会</div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-name">大赛承办单位：</div>
          <div class="cell-content">
            <div>通服智慧物联科技（南京）有限公司</div>
          </div>
        </div>

        <div class="cell">
          <div class="cell-name">大赛项目：</div>
          <div class="cell-content">
            <div>电工（智慧家庭工程师）</div>
            <div>制冷与空调</div>
            <div>管道与制暖</div>
            <div>金牌店长、家电顾问</div>
            <div>家装设计</div>
          </div>
        </div>

        <div class="cell">
          <div class="cell-name">参赛条件：</div>
          <div class="cell-content"></div>
        </div>

        <div class="side">
          全省凡从事电工（智慧家庭工程师）、制冷与空调、门店经理、销售顾问、家装设计、管道与制暖等项目的一线人员，职业技师学校学生。不限地区、单位性质、年龄、性别，均可报名参加本次职业技能比赛。
        </div>
      </div>
    </transition>
    <!--<div class="btns">
      <div class="btn" @click="handleGo(2)">查看报名</div>
      <div class="btn" @click="handleGo(1)">我要报名</div>
    </div>-->

    <div class="hide">
      <img
        @click="show = !show"
        v-if="!show"
        src="../assets/img/down.gif"
        alt=""
      />
      <img
        @click="show = !show"
        v-if="show"
        src="../assets/img/up.gif"
        alt=""
      />
    </div>

    <div class="apply">
      <div class="info">
        <div class="info-title">报名参赛</div>
        <div class="line"></div>
      </div>
      <div class="side-info">点击这里即可报名</div>
      <div class="side-btn" @click="handleGo">立即报名</div>
    </div>

    <div class="entrance">
      <div class="entrance-item" @click="handleGoIntro">
        <img src="../assets/img/介绍.png" alt="" />
        <div>赛事介绍</div>
      </div>
      <div class="entrance-item" @click="viewApplyInfo">
        <img src="../assets/img/报名.png" alt="" />
        <div>报名信息</div>
      </div>
      <div class="entrance-item" @click="$toast('未到开放时间，敬请期待')">
        <img src="../assets/img/培训.png" alt="" />
        <div>线上培训</div>
      </div>
    </div>

    <div class="news">
      <div class="news-title">
        <div class="news-title-name">赛事动态</div>
        <div class="news-title-more" @click="$router.push('/news')">
          更多资讯动态<van-icon
            style="position: relative;top: 2px;"
            name="arrow"
            color="#333333"
          />
        </div>
      </div>
      <template v-if="newsList.length > 0">
        <div
          class="news-item"
          v-for="item in newsList"
          :key="item.id"
          @click="$router.push('/newsDetail?id=' + item.id)"
        >
          <div class="left">
            <img :src="item.imgUrl ? item.imgUrl : require('../assets/img/default.png')" alt="" />
          </div>
          <div class="right">
            <div class="right-news-name">
              {{ item.title }}
            </div>
            <div class="right-news-date">
              {{ item.updateTime && item.updateTime.split(" ")[0] }}
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <empty :desc="'暂无资讯动态'" />
      </template>
    </div>

    <div class="tip">关注官方微信公众号“小象优服工程师”了解大赛最新资讯</div>
  </div>
</template>

<script>
import { isWeiXin } from "../utils/common";
import { Toast } from "vant";
import Empty from "../components/Empty";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  inject: ["reload"],
  components: {
    Empty,
  },
  data() {
    return {
      show: false,
      newsList: [],
      pageNum: 1,
      pageSize: 5,
    };
  },
  computed: {
    ...mapGetters({
      token: "token",
    }),
  },
  created() {
    if (!isWeiXin()) {
      Toast("请在微信打开链接参与比赛报名");
    }
    this.pageNews();
  },
  methods: {
    handleGoIntro() {
      this.$api
        .pageNews({
          data: { state: 1, type: 1 },
          pageNum: 1,
          pageSize: 1,
        })
        .then((res) => {
          if (res.rescode === 2000 && res.data.list.length) {
            this.$router.push("/newsDetail?id=" + res.data.list[0].id);
          } else {
            Toast("暂无赛事介绍!");
          }
        });
    },
    handleGo() {
      if (!this.token) {
        // this.$router.push({
        //   path: "/mobile",
        //   query: {
        //     from: "home",
        //   },
        // });
        if(!isWeiXin()) return Toast("请在微信打开链接参与比赛报名");
        this.getAuthorizationUrl()
      } else {
        this.$api.queryGamePersonnel().then((res) => {
          if (res.rescode === 2000) {
            if (res.data === null) {
              // this.$router.push(`/userInfo`);
              if(!isWeiXin()) return Toast("请在微信打开链接参与比赛报名");
              this.getAuthorizationUrl()
            } else {
              this.$router.push(`/result`);
            }
          }
        });
      }
    },
    getAuthorizationUrl() {
      const params = window.location.href.split("from=");
      let fromPath = params.length > 1 ? `?from=${params[1]}` : "";
      let url = `${process.env.VUE_APP_AUTHORIZE_URL}/authorization${fromPath}`;
      url = url || location.href.split("#")[0];

      let fd = new FormData();
      fd.append("userType", 2);
      fd.append("scope", true);
      fd.append("toUrl", url);

      this.$api.getWechatAuthorizeUrl(fd).then((res) => {
        if (res.rescode === 2000) {
          window.location.replace(res.data);
        } else {
          Toast("抱歉，获取微信授权登录失败");
        }
      });
    },
    pageNews() {
      this.$api
        .pageNews({
          data: { state: 1, type: 2 },
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.rescode === 2000 && res.data.list.length) {
            this.newsList = res.data.list;
          }
        });
    },
    viewApplyInfo() {
      this.$router.push("/result");
    },
  },
};
</script>

<style lang="scss" scoped>
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }

.home-container {
  width: 100vw;
  background: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;

  .logo {
    img {
      height: 58px;
      margin-top: 30px;
    }
  }

  .title {
    margin-top: 20px;
    margin-bottom: 20px;
    img {
      width: 326px;
      height: 51px;
    }
  }

  .wrap {
    width: 90%;

    .cell {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      margin-top: 10px;
      &-name {
        line-height: 20px;
        font-size: 14px;
        font-weight: 600;
        flex: 0 0 100px;
      }

      &-content {
        flex: 1;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
      }
    }

    .side {
      font-size: 14px;
      line-height: 20px;
      color: #333333;
      margin-top: 5px;
    }
  }

  .hide {
    margin-top: 10px;
    img {
      height: 25px;
    }
  }

  .apply {
    width: 345px;
    margin: 20px auto 10px;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .info {
      font-size: 22px;
      font-weight: 500;
      color: #333333;
      width: 166px;
      text-align: center;
      position: relative;
      z-index: 0;

      .info-title {
        width: 120px;
        margin: 0 auto;
        background: #fff;
        z-index: 99;
      }

      .line {
        height: 1px;
        background: #d9d9d9;
        position: absolute;
        width: 100%;
        top: 16px;
        z-index: -1;
      }
    }

    .side-info {
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      font-weight: 400;
      color: #666666;
      margin-top: 20px;
    }

    .side-btn {
      margin-top: 20px;
      width: 150px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      background: linear-gradient(
        90deg,
        rgba(59, 122, 255, 1) 0%,
        rgba(111, 179, 255, 1) 100%
      );
      box-shadow: 0px 3px 5px 0px rgba(55, 149, 240, 0.2);
      border-radius: 4px;
    }
  }

  .entrance {
    width: 345px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-item {
      height: 126px;
      text-align: center;
      width: 109px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 6px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
        margin-bottom: 20px;
      }
    }
  }

  .news {
    box-sizing: border-box;
    padding: 0 15px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 10px;

    &-title {
      height: 30px;
      line-height: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &-name {
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(38, 38, 38, 1);
      }

      &-more {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    &-item {
      width: 345px;
      height: 110px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      overflow: hidden;

      .left {
        width: 120px;
        height: 110px;

        img {
          width: 120px;
          height: 100%;
          object-fit: cover;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 15px;
        justify-content: space-between;

        &-news-name {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #262626;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        &-news-date {
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }

  .tip {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .btns {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 35px;
    width: 100vw;
    margin-bottom: 30px;
    .btn {
      width: 150px;
      height: 42px;
      line-height: 42px;
      background: rgba(88, 154, 215, 1);
      border-radius: 22px;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
