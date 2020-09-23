<template>
  <van-tabbar v-model="active" fixed route active-color="#3B7AFF">
    <van-tabbar-item to="/home" replace icon="home-o">大赛首页</van-tabbar-item>
    <van-tabbar-item to="/my" replace icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      active: 0
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
