<template>
  <div class="prism-player" :id="jid"></div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Video",
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      player: null,
      jid: "",
    };
  },
  created() {
    this.jid = "J_prismPlayer_" + uuidv4();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!window.Aliplayer) return;
      this.player = new Aliplayer(
        {
          id: this.jid,
          source: this.source,
          width: "100%",
          height: "200px",
          autoplay: false,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,

          //   extraInfo: {
          //     crossOrigin: "anonymous",
          //   },
          //   cover:"https://img.alicdn.com/tps/TB1EXIhOFXXXXcIaXXXXXXXXXXX-760-340.jpg",
          skinLayout: [
            { name: "bigPlayButton", align: "cc" },
            {
              name: "H5Loading",
              align: "cc",
            },
            { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
            { name: "infoDisplay" },
            { name: "tooltip", align: "blabs", x: 0, y: 56 },
            { name: "thumbnail" },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                { name: "progress", align: "blabs", x: 0, y: 44 },
                { name: "playButton", align: "tl", x: 15, y: 12 },
                { name: "timeDisplay", align: "tl", x: 10, y: 7 },
                { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
                { name: "subtitle", align: "tr", x: 15, y: 12 },
                { name: "setting", align: "tr", x: 15, y: 12 },
                { name: "volume", align: "tr", x: 5, y: 10 },
              ],
            },
          ],
        },
        function(player) {
          console.log("The player is created");
        }
      );

      this.player.on("snapshoted", function(data) {
          debugger;
        var pictureData = data.paramData.base64;
        var downloadElement = document.createElement("a");
        downloadElement.setAttribute("href", pictureData);
        var fileName = "Aliplayer" + Date.now() + ".png";
        downloadElement.setAttribute("download", fileName);
        downloadElement.click();
        pictureData = null;
      });
    },
  },
  destroyed() {
    this.player = null;
  },
};
</script>

<style lang="scss" scoped>
// /deep/ .prism-player .prism-info-display {
//   padding: 0 !important;
// }
// .prism-player{
//     width: 100%;
//     height: 300px;
// }

// .prism-player .prism-big-play-btn {
//     width: 32px;
//     height: 32px;
// }
</style>
