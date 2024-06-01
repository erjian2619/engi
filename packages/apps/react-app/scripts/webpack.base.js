const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function (isDev) {
  return {
    // 1.基础
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "static/js/[name].[hash:8].js",
      // webpack 4没有, clean-webpack-plugin
      clean: true,
      // 打包后公共路径
      publicPath: "/",
    },

    //2.resolve
    // 优化索引依赖
    // 用于引入模块时可以不带文件后缀，可能影响构建性能
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },

    // 3.loader
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx|js)$/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          oneOf: [
            {
              test: /\.module\.(less|css)$/,
              include: [path.resolve(__dirname, "../src")],
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                // "css-loader",
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      // 借助 css-module
                      localIdentName: '[path][name]_[local]--[hash:base64:5]'
                    },
                  },
                },
                "postcss-loader",
                "less-loader",
              ],
            },
            {
              test: /\.css$/,
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
              ],
            },
            {
              test: /\.less$/,
              use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "less-loader",
              ],
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
          generator: {
            filename: "static/iamges/[name].[contenthash:8][ext]",
          },
        },
        // {
        //   test: /\.(woft)/,
        //   generator: {
        //     filename: "static/fonts/[name].[contenthash:8][ext]",
        //   },
        // },
      ],
    },

    // plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: isDev 
        ? 'static/css/[name].css' 
        : 'static/css/[name].[contenthash:4].css'
      })
    ]
  };
};
