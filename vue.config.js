// const SkeletonWebpackPlugin = ;
const port = 80;

module.exports = {
  publicPath: "/",
  lintOnSave: false,
  devServer: {
    port: port,
    open: true,
    // host: 'test.hellozj.com',
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        // 根据全局样式文件调整位置
        prependData: '@import "@/assets/scss/global.scss";',
      },
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            viewportWidth: 375,
            // viewportHeight: 1334,
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
            viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: [/^\.van/], // 这里是过滤不转换的css，支持正则，如果框架本身把单位写死支持移动端，可以通过这个过滤掉,
            minPixelValue: 1,
            mediaQuery: false,
          }),
        ],
      },
    },
  },
  configureWebpack: (config) => {
    // vue骨架屏插件配置
    config.plugins.push(
      new require("vue-skeleton-webpack-plugin")({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/entry-skeleton.js"),
          },
        },
        minimize: true,
        quiet: true,
      })
    );
  },
};
