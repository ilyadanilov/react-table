const express = require("express");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hotReload = require("webpack-hot-middleware");
const tableModel = require("./server/tableModel");
const webpackConfig = require("./webpack.config");

const app = express();
const port = 8080;
// Возможно я должен передать в compiler файл конфигурации webpack целиком, для этого его нужно require
const compiler = webpack(webpackConfig);
// instance используется ниже для рекомпиляции бандла.
const instance = middleware(compiler);

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
    headers: (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers"
      );
    },
    publicPath: "/",
  })
);

app.use(hotReload(compiler));

app.get("/", (req, res) => {
  tableModel
    .getRows()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/mytable", (req, res) => {
  tableModel
    .createRow(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/mytable/:id", (req, res) => {
  tableModel
    .deleteRow(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

Рекомпилирует сборку, при изменении конфига. По крайней мере должно
instance.invalidate();

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
