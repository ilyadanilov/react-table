import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  }, [rows]);

  /* TODO СОРТИРОВКА
  Написать функцию для сортировки массива с строчками, будет вызываться при нажатии на одно из названий колонок
  */
  function tableSort(columnName) {
    // Здесь сортировка массива
  }
  // Иттератор, готовит строки с данными к рендеру
  const rowsForRender = rows.map((row, i) => {
    return (
      <tr key={i}>
        <td>{row.name}</td>
        <td>{row.amount}</td>
        <td>{row.longitude}</td>
        <td>{row.date}</td>
      </tr>
    );
  });
  if (!rows) {
    return <p>wait for it</p>;
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
      <tbody>{rowsForRender}</tbody>
    </StyledTable>
  );
}
// Стили для таблицы
const StyledTable = styled.table`
  margin: 0 auto;
  font-size: 16px;
  border: solid 1px black;
  th,
  td {
    border: solid 1px black;
  }
`;
