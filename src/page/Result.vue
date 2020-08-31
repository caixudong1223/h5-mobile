<template>
  <div class="container">
    <van-nav-bar
      title="报名结果"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="result">
      <div class="result-image">
        <img v-if="type == 0" src="../assets/img/noapply.png" alt="" />
        <img v-if="type == 1" src="../assets/img/success.png" alt="" />
        <img v-if="type == 2" src="../assets/img/pass.png" alt="" />
        <img v-if="type == 3" src="../assets/img/fail.png" alt="" />
      </div>

      <div class="title">
        {{ resultObj.title }}
      </div>
      <div class="side" :class="{ 'side-error': type == 3 }">
        {{ resultObj.side }}
        <template v-if="type == 3">
          {{ auditRemark || "暂无" }}
        </template>
      </div>
    </div>

    <div class="btn" @click="handleClick">
      {{ resultObj.btnText }}
    </div>
  </div>
</template>

<script>
import { isWeiXin } from "../utils/common";
import { mapGetters } from "vuex";
export default {
  name: "Result",
  data() {
    return {
      auditRemark: "",
      type: "",
      mobile: "",
      result: [
        {
          type: 0,
          title: "暂无任何报名信息",
          side: "",
          btnText: "立即报名",
        },
        {
          type: 1,
          title: "报名成功",
          side: "资料提交成功，请耐心等待审核",
          btnText: "查看报名信息",
        },
        {
          type: 2,
          title: "审核通过",
          side: "培训题库系统将于近日开启，请耐心等待",
          btnText: "查看报名信息",
        },
        {
          type: 3,
          title: "报名失败",
          side: "失败原因：",
          btnText: "重新申请",
        },
      ],
      resultObj: {},
    };
  },
  computed: {
    ...mapGetters({
      token: "token",
    }),
  },
  created() {
    this.token && this.getResult();
  },
  methods: {
    getResult() {
      this.$api.queryGamePersonnel().then((res) => {
        if (res.rescode === 2000) {
          if (res.data) {
            this.type = res.data.auditStatus;
            this.auditRemark = res.data.auditRemark;
            this.mobile = res.data.mobile;
            this.result.map((item) => {
              if (item.type == res.data.auditStatus) {
                this.resultObj = item;
              }
            });
          } else {
            this.resultObj = this.result[0];
          }
        } else {
          this.resultObj = this.result[0];
        }
      });
    },
    handleClick() {
      if (this.resultObj.type !== 0) {
        this.$router.push(
          "/userInfo?type=" + this.type + "&mobile=" + this.mobile
        );
      } else {
        if(!isWeiXin()) return Toast("请在微信打开链接参与比赛报名");
        this.getAuthorizationUrl()
        // this.$router.push("/userInfo");
      }
    },
    onClickLeft() {
      this.$router.push('/home');
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
  },
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #000;
}
.container {
  height: 100vh;

  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-image {
      img {
        height: 101px;
        margin-top: 60px;
      }
    }

    .title {
      height: 20px;
      line-height: 20px;
      margin-top: 30px;
      font-weight: 600;
      color: #262626;
      font-size: 16px;
    }

    .side {
      color: #999999;
      font-size: 14px;
      margin-top: 10px;
      padding: 0 20px;
      word-break: break-all;
      

      &-error {
        color: #dc5d4f;
      }
    }
  }

  .btn {
    width: 165px;
    height: 46px;
    line-height: 46px;
    background: rgba(241, 241, 241, 1);
    border-radius: 4px;
    color: #3b7aff;
    font-size: 16px;
    text-align: center;
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
</style>
