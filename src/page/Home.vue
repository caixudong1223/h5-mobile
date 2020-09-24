<template>
  <div class="container">首页</div>
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
    return {};
  },
  computed: {
    ...mapGetters({
      token: "token",
    }),
  },
  created() {},
  methods: {},
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

.container {
  height: 100vh;
  background: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
}
</style>
