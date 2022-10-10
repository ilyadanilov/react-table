require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

const port = process.env.PORT || 3001;

app.use(morgan("dev"));

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
