require("dotenv").config();

const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const hotReload = require("webpack-hot-middleware");
const webpackConfig = require("../webpack.config");

const app = express();
const port = process.env.PORT || 3001;
console.log([process.env]);
// Возможно я должен передать в compiler файл конфигурации webpack целиком, для этого его нужно require
const compiler = webpack(webpackConfig);
// instance используется ниже для рекомпиляции бандла.
app.use(hotReload(compiler));

app.use(
  webpackMiddleware(compiler, {
    publicPath: "/",
  })
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
