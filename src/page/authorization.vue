<template>
  <div class="container">
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="wrap">
        <img class="qrcode" src="../assets/img/qrcode.jpg" alt="" />
        <div class="tip">长按二维码关注公众号参与大赛报名</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from 'vuex'
export default {
  name: "authorization",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapGetters({
      token: "token"
    })
  },
  created() {
    this.judgeEngineerOfficialAccount();
  },
  methods: {
    judgeEngineerOfficialAccount() {
      Toast.loading({
        message: "获取微信授权中...",
        forbidClick: true,
      });
      let fd = new FormData();
      fd.append("code", this.$route.query.code);
      fd.append("userType", 2);

      this.$api.judgeEngineerOfficialAccount(fd).then((res) => {
        if (res.rescode === 2000) {
          Toast.clear();
          if (res.data == 0) {
            this.show = true;
          } else {
            // this.$router.replace("/mobile?flag=" + 1);
            if (!this.token) {
              this.$router.replace({
                path: "/mobile",
                query: {
                  from: "home",
                },
              });
            } else {
              this.$api.queryGamePersonnel().then((res) => {
                if (res.rescode === 2000) {
                  if (res.data === null) {
                    this.$router.replace(`/userInfo`);
                  } else {
                    this.$router.replace(`/result`);
                  }
                }
              });
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .info {
    color: #999;
    width: 100%;
    text-align: center;
  }
}
.wrap {
  padding: 5px;
  .qrcode {
    width: 200px;
    height: 200px;
    display: block;
  }

  .tip {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 5px 0;
  }
}
</style>
