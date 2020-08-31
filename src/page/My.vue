<template>
  <div class="container">
    <van-nav-bar
      title="个人中心"
      fixed
      left-text=""
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="user">
      <div class="wrap">
        <div class="avatar">
          <van-image
            :src="
              !token
                ? require('../assets/img/default-null.png')
                : require('../assets/img/default-user.png')
            "
          ></van-image>
        </div>

        <div class="acount">{{ token ? mobile : "未登录" }}</div>
      </div>
      <div class="user-button">
        <van-button
          v-if="!token"
          type="primary"
          color="#3B7AFF"
          block
          @click="goLogin"
          >登录</van-button
        >

        <van-button v-if="token" color="#3B7AFF" plain block @click="logout"
          >退出登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "my",
  inject: ["reload"],
  data() {
    return {
      mobile: "",
    };
  },
  computed: {
    ...mapGetters({
      token: "token",
    }),
  },
  created() {
    this.token && this.getUser();
  },
  methods: {
    ...mapMutations({
      updateToken: "updateToken",
      updatePhone: "updatePhone",
    }),
    onClickLeft() {
      this.$router.go(-1);
    },
    getUser() {
      this.$api.queryGamePersonnel().then((res) => {
        if (res.rescode === 2000 && res.data) {
          this.mobile = res.data.mobile;
        } else {
          this.mobile = Cookies.get("phone");
        }
      });
    },
    goLogin() {
      this.$router.push({
        path: "/mobile",
        query: {
          redirect: this.$route.fullPath,
        },
      });
    },
    logout() {
      this.$dialog
        .confirm({
          title: "",
          message: "确认退出登录？",
          confirmButtonColor: "#3B7AFF",
        })
        .then(() => {
          this.$api.logout().then(res => {
            this.updateToken("");
            this.updatePhone("");
            Cookies.remove("access_token");
            Cookies.remove("phone");
            this.reload();
          });

          
          
        })
        .catch(() => {
          console.log("取消");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #333 !important;
}
.container {
  height: 100vh;

  .user {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;

    .wrap {
      .avatar {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .acount {
        margin-top: 30px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
        text-align: center;
      }
    }

    .user-button {
      width: 90vw;
    }
  }
}
</style>
