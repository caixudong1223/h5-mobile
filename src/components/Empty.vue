<template>
  <div class="empty">
    <img src="../assets/img/nodata.png" alt="" />
    <div class="empty-desc">{{ desc }}</div>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: {
    desc: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.empty {
  box-sizing: border-box;
  padding: 20px 10px;
  text-align: center;

  &-desc {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 10px;
    color: #e6e6e6;
  }
}
</style>
