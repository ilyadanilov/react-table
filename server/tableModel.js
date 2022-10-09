const { request } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "test_table",
  password: "1234",
  port: 5432,
});

const getRows = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM mytable ORDER BY id ASC", (error, results) => {
      console.log(results);
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createRow = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, amount } = body;
    pool.query(
      // "INSERT INTO mytable (name, date, amount, distance) VALUES ($1, $2, $3, $4) RETURNING *",
      "INSERT INTO mytable (name, amount) VALUES ($1, $2) RETURNING *",
      // [name, amount, distance, date],
      [name, amount],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`New row has been added: ${results.rows[0]}`);
      }
    );
  });
};

const deleteRow = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM mytable WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Row with id: ${id} deleted`);
    });
  });
};

module.exports = {
  getRows,
  createRow,
  deleteRow,
};
// Хочется назвать функции понятно, но мне не понятно какие данные хранит таблица, поэтому названия общие
