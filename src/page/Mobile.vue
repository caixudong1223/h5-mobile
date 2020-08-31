<template>
  <div class="container">
    <van-nav-bar
      title=""
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="login">
      <div class="type">
        <div :class="['type-item', 'type-item-active']">
          登录
        </div>
      </div>
      <div class="field-list">
        <Field
          label="手机号"
          placeholder="请输入手机号"
          :value="phone"
          keyname="phone"
          @update-val="updateVal"
        />
        <!-- 验证码登录 -->
        <Field
          label="验证码"
          placeholder="验证码"
          keyname="code"
          :value="code"
          @update-val="updateVal"
        >
          <div
            :class="['code', { 'code-disable': computeTime > 0 }]"
            @click="handleSendCode()"
          >
            {{ computeTime > 0 ? `${computeTime}s后重新获取` : "获取验证码" }}
          </div>
        </Field>

        <!-- 登录按钮 -->
        <div class="login-btn">
          <van-button type="primary" color="#3B7AFF" block @click="handleNext()"
            >下一步</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import { setToken, removeToken } from "../utils/cookie";
import Field from "./components/Field";

const validateMobile = function(s) {
  return /^1[3456789]\d{9}$/.test(s);
};

export default {
  name: "Mobile",
  components: {
    [Field.name]: Field,
  },
  data() {
    return {
      phone: "", //手机号
      code: "",
      smsKey: "",
      computeTime: 0, //倒计时时间
    };
  },
  computed: {
    title() {
      return this.$route.query.flag == 1 ? "填写报名信息" : "查看报名信息";
    },
  },
  methods: {
    ...mapMutations({
      updateToken: "updateToken",
      updatePhone: "updatePhone",
    }),
    updateVal(obj) {
      console.log(obj);
      this[obj.key] = obj.value;
    },
    handleNext() {
      if (!validateMobile(this.phone)) return Toast("手机号不正确");
      if (!this.smsKey) return Toast("验证码不正确");
      if (!this.code) return Toast("请输入手机号");
      this.$api
        .login({
          phone: this.phone,
          smsKey: this.smsKey,
          smsCode: this.code,
        })
        .then((res) => {
          if (res.rescode === 2000) {
            Cookies.set("access_token", res.data.token);
            Cookies.set("phone", res.data.phone);
            this.updateToken(res.data.token);
            this.updatePhone(res.data.phone);

            if (this.$route.query.redirect) {
              this.$router.replace(this.$route.query.redirect);
            } else if (this.$route.query.from === "home") {
              this.$api.queryGamePersonnel().then((res) => {
                if (res.rescode === 2000) {
                  if (res.data === null) {
                    this.$router.replace(`/userInfo`);
                  } else {
                    this.$router.push(`/result`);
                  }
                }
              });
            } else {
              this.$router.replace("/");
            }

            // this.$api.queryGamePersonnel().then((res) => {
            //   if (res.rescode === 2000) {
            //     if (res.data === null) {
            //       this.$router.replace(`/userInfo?mobile=${this.phone}`);
            //     } else {
            //       this.$router.push(
            //         `/result?type=${res.data.auditStatus}&mobile=${this.phone}&auditRemark=${res.data.auditRemark}`
            //       );
            //     }
            //   }
            // });
          } else {
            Toast(res.message || "");
          }
        });
    },
    // 获取验证码
    handleSendCode() {
      if (this.computeTime > 0) return;
      if (!validateMobile(this.phone)) {
        return Toast({
          message: "请输入正确的手机号",
          duration: 2000,
        });
      }
      let fd = new FormData();
      fd.append("phone", this.phone);
      this.$api
        .getSmsCode(fd)
        .then((res) => {
          if (res && res.rescode == 2000) {
            Toast("验证码已发送");
            this.smsKey = res.data.smsKey;
            this.computeTime = 60;
            const interId = setInterval(() => {
              if (this.computeTime <= 0) {
                clearInterval(interId);
                this.computeTime = 0;
                return;
              }
              this.computeTime--;
            }, 1000);
          } else {
            Toast(res.message);
          }
        })
        .catch((err) => {
          Toast(err);
        });
    },

    onClickLeft() {
      if(this.$route.query.from === "home") {
        this.$router.push('/home')
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #333;
}
.container {
  height: 100vh;
}
.login {
  box-sizing: border-box;
  padding: 15px;
  overflow: hidden;
  background: #fff;

  .type {
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 28px;
    color: #999999;
    margin-top: 35px;
    .sep {
      margin-top: -2px;
      img {
        height: 20px;
        margin: 0 8px;
      }
    }
    &-item {
      // padding: 0 10px;

      &-active {
        color: #000;
        font-weight: 600;
      }
    }

    // &-item:first-child {
    //   border-right: 1px solid #ccc;
    // }
  }

  .field-list {
    margin-top: 30px;

    .login-btn {
      margin: 30px 0 15px;
      .van-button__text {
        font-size: 16px;
      }

      .van-button {
        border-radius: 4px;
      }
    }

    .code {
      display: inline-block;
      color: #3b7aff;

      &-disable {
        color: #999999;
      }
    }

    .side-info {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #999;
      position: relative;
      span {
        display: inline-block;
        color: #4a7be3;
      }

      .forget-pwd {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  .wx-login {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 50px;
    text-align: center;
    color: #999999;
    img {
      display: block;
      width: 40px;
      margin: 20px auto 0;
    }
  }
}
</style>
