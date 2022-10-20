import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Table() {
  const [rows, setRows] = useState(false);
  function getRows() {
    fetch("http://localhost:3000/api/v1/test")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRows(data.rows);
      });
  }

  useEffect(() => {
    getRows();
  }, []);

  /* TODO СОРТИРОВКА
  Написать функцию для сортировки массива с строчками, будет вызываться при нажатии на одно из названий колонок
  */
  function tableSort(columnName) {
    // Здесь сортировка массива
  }
  if (!rows) {
    return null;
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          <th onClick={() => tableSort("name")}>Название</th>
          <th onClick={() => tableSort("amount")}>Количество</th>
          <th onClick={() => tableSort("distance")}>Расстояние</th>
          <th onClick={() => tableSort("date")}>Дата</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={uuidv4()}>
              <td>{row.name}</td>
              <td>{row.amount}</td>
              <td>{row.longitude}</td>
              <td>{new Date(row.date).toLocaleDateString("ru-ru")}</td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
// Стили для таблицы
const StyledTable = styled.table`
  margin: 0 auto;
  font-size: 16px;
  border: solid 1px black;
  table-layout: fixed;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    padding: 0.75em 1em;
    border: solid 1px #cdcdcd;
  }
`;
