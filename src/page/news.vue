<template>
  <div class="container">
    <van-nav-bar
      title="大赛动态"
      fixed
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      loosing-text="刷新动态..."
    >
      <div class="news">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <template v-if="newsList.length > 0">
            <div
              class="news-item"
              v-for="(news, index) in newsList"
              :key="index"
              @click="handleViewNews(news.id)"
            >
              <div class="left">
                <img :src="news.imgUrl ? news.imgUrl : require('../assets/img/default.png')" alt="" />
              </div>
              <div class="right">
                <div class="right-news-name">
                  {{ news.title }}
                </div>
                <div class="right-news-date">
                  {{ news.updateTime && news.updateTime.split(" ")[0] }}
                </div>
              </div>
            </div>
          </template>
          <template v-if="finished && newsList.length === 0">
            <empty :desc="'暂无资讯动态'" />
          </template>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Empty from "../components/Empty";
export default {
  name: "news",
  inject: ["reload"],
  components: {
    Empty,
  },
  data() {
    return {
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 5,
      newsList: [],
      isLoading: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.$api
        .pageNews({
          data: { state: 1, type: 2 },
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.loading = false;
          if (res.rescode === 2000) {
            this.newsList = this.newsList.concat(res.data.list);
            this.pageNum++;
            if (res.data.isLastPage) {
              this.finished = true;
            }
          } else {
            this.newsList = [];
            this.finished = true;
          }
        });
    },
    handleViewNews(id) {
      this.$router.push("/newsDetail?id=" + id);
    },
    onRefresh() {
      setTimeout(() => {
        this.pageNum = 1;
        this.finished = false;
        this.isLoading = false;
        this.loading = false;
        this.newsList = [];
      }, 1000);
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

  .news {
    box-sizing: border-box;
    padding: 0 15px;
    width: 100%;
    padding: 10px 0;
    // height: calc(100vh - 46px);
    margin-top: 46px;
    overflow: scroll;

    &-item {
      width: 345px;
      height: 110px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      margin: 0 auto 10px;

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
}
</style>
