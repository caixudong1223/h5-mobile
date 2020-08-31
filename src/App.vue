<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>

    <Footer v-if="$route.meta.showFooter" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {
    Footer,
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
/* 去除默认自带的所有边距 */
html,
body {
  margin: 0px;
  padding: 0px;
  -webkit-overflow-scrolling: touch;
  padding-bottom: constant(safe-area-inset-bottom);
}

::-webkit-scrollbar {
  display: none;
  /* background-color:transparent; */
}
</style>
