const { merge } = require("webpack-merge");
const getBaseCfg = require("./webpack.base");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(getBaseCfg(false), {
  mode: "production",

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
    // 分包
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          // miniChunk: 3,
          // miniSize: 123
        },
        commons: {
          name: "commons",
        },
      },
    },
  },
});
