const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: ["./src/index.js", "webpack-hot-middleware/client"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    host: "localhost",
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node-modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "/public/index.html"),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),

    new webpack.HotModuleReplacementPlugin(),
  ],
};
