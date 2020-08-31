<template>
  <div class="container">
    <div class="video-list">
      <div
        class="video-list-item"
        v-for="(video, index) in videoList"
        :key="index"
      >
        <a-video :source="video.source"></a-video>
      </div>
    </div>
  </div>
</template>

<script>
import AVideo from "./components/video";
export default {
  name: "VideoList",
  components: {
    AVideo,
  },
  data() {
    return {
      videoList: [
        {
          source: "//player.alicdn.com/video/aliyunmedia.mp4",
        },
        // {
        //   source: "//player.alicdn.com/video/editor.mp4",
        // },
        // {
        //   source: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
        // },
        // {
        //   source: "http://oldvod2.v.news.cn/1F/FE/1f74d72eedda3dc922b3487f49619c4730b4fbfe.mp4"
        // }
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #fff;
  padding-bottom: 60px;
  box-sizing: border-box;

  .video-list-item {
    width: 100vw;
    height: 200px;
    // margin: 10px auto;
  }
}
</style>
