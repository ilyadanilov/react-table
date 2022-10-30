import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

export default function Table() {
  const [rows, setRows] = useState(false);
  const [currSortColumn, setCurrSortColumn] = useState("name");

  function sortByName(arr) {
    const sortedArr = [...arr].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedArr;
  }

  function getRows() {
    fetch("http://localhost:3000/api/v1/test")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRows(sortByName(data.rows));
      });
  }

  useEffect(() => {
    getRows();
  }, []);

  /* TODO СОРТИРОВКА
  Написать функцию для сортировки массива с строчками, будет вызываться при нажатии на одно из названий колонок
  */
  function sortByAmount(arr) {
    // Здесь сортировка массива
    return [...arr].sort((a, b) => {
      return a.amount - b.amount;
    });
  }
  function sortByDistance(arr) {
    return [...arr].sort((a, b) => {
      return a.longitude - b.longitude;
    });
  }
  function sortByDate(arr) {
    return [...arr].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  function handleColumnClick(columnName) {
    if (currSortColumn === columnName) {
      setRows([...rows].reverse());
      return;
    }
    setCurrSortColumn(columnName);
    switch (columnName) {
      case "name":
        setRows(sortByName(rows));
        break;
      case "amount":
        setRows(sortByAmount(rows));
        break;
      case "distance":
        setRows(sortByDistance(rows));
        break;
      case "date":
        setRows(sortByDate(rows));
        break;
      default:
        setRows(sortByName(rows));
        break;
    }
  }

  if (!rows) {
    return null;
  }
  // console.log(rows);
  return (
    <StyledTable>
      <thead>
        <tr>
          <th onClick={() => handleColumnClick("name")}>
            Название
            <FontAwesomeIcon icon={solid("sort-up")} />
            <FontAwesomeIcon icon={solid("sort-down")} />
          </th>
          <th onClick={() => handleColumnClick("amount")}>Количество</th>
          <th onClick={() => handleColumnClick("distance")}>Расстояние</th>
          <th onClick={() => handleColumnClick("date")}>Дата</th>
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
  th {
    cursor: pointer;
    user-select: none;
  }
  th,
  td {
    text-align: left;
    padding: 0.75em 1em;
    border: solid 1px #cdcdcd;
  }
  tr:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  thead th:nth-child(1) {
    width: 30%;
  }
  thead th:nth-child(2) {
    width: 20%;
  }

  thead th:nth-child(3) {
    width: 25%;
  }

  thead th:nth-child(4) {
    width: 25%;
  }
`;
