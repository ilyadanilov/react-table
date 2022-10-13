if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const hotReload = require("webpack-hot-middleware");
const db = require("./db");
const webpackConfig = require("../webpack.config");

const app = express();
const port = process.env.PORT || 3001;
const compiler = webpack(webpackConfig);

app.use(hotReload(compiler));

app.use(
  webpackMiddleware(compiler, {
    publicPath: "/",
  })
);

app.use(
  morgan("dev", {
    skip(req, res) {
      return req.url !== "/api/v1/test";
    },
  })
);

app.use(express.json());

app.get("/api/v1/test", async (req, res) => {
  try {
    const results = await db.query("SELECT * from mytable");
    res.status(200).json({
      status: 200,
      results: results.rows.length,
      rows: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`listening port ${port} go to localhost:${port}`);
});
