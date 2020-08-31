<template>
  <div class="container">
    <van-nav-bar
      :title="newsTitle"
      fixed
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="content" v-html="newsContent"></div>
  </div>
</template>

<script>
export default {
  name: "NewsDetail",
  data() {
    return {
      newsTitle: "资讯",
      newsContent:
        "<p>香港特区政府也曾表示，有关规定除了可能不符合世贸规定外，亦无助保障消费者利益，更会带来混乱，损害各方包括美国自身的利益。港府发言人说：“香港特别行政区在‘一国两制’下享有单独关税区的独特地位，是根据国家《宪法》和《基本法》赋予的，并获世贸等多边组织认可，并非个别国家施予或可以撤销。”</p><p>香港特区政府也曾表示，有关规定除了可能不符合世贸规定外，亦无助保障消费者利益，更会带来混乱，损害各方包括美国自身的利益。港府发言人说：“香港特别行政区在‘一国两制’下享有单独关税区的独特地位，是根据国家《宪法》和《基本法》赋予的，并获世贸等多边组织认可，并非个别国家施予或可以撤销。”</p><p>香港特区政府也曾表示，有关规定除了可能不符合世贸规定外，亦无助保障消费者利益，更会带来混乱，损害各方包括美国自身的利益。港府发言人说：“香港特别行政区在‘一国两制’下享有单独关税区的独特地位，是根据国家《宪法》和《基本法》赋予的，并获世贸等多边组织认可，并非个别国家施予或可以撤销。”</p><p>香港特区政府也曾表示，有关规定除了可能不符合世贸规定外，亦无助保障消费者利益，更会带来混乱，损害各方包括美国自身的利益。港府发言人说：“香港特别行政区在‘一国两制’下享有单独关税区的独特地位，是根据国家《宪法》和《基本法》赋予的，并获世贸等多边组织认可，并非个别国家施予或可以撤销。”</p>",
    };
  },
  created() {
    this.getNews()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getNews() {
      this.$api
        .getNews({
          id: Number(this.$route.query.id),
        })
        .then((res) => {
          if (res.rescode === 2000 && res.data.length) {
            this.newsTitle = res.data[0].title
            this.newsContent = res.data[0].content
          }
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
  .content {
    min-height: 100vh;
    padding: 46px 15px 10px;
    box-sizing: border-box;
  }
}
</style>
