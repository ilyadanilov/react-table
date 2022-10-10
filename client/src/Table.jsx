import React, { useState, useEffect } from "react";

export default function Table() {
  const [rows, setRows] = useState(false);
  function getRows() {
    fetch("http://localhost:8080/getRows")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setRows(data);
      });
  }
  useEffect(() => {
    getRows();
  }, []);
  function createRow() {
    const name = prompt("Enter name");
    const amount = prompt("Enter amount");
    fetch("http://localhost:3001/mytable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getRows();
      });
  }
  function deleteMerchant() {
    const id = prompt("Enter merchant id");
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getRows();
      });
  }
  return (
    <div>
      {rows || "There is no merchant data available"}
      <br />
      <button onClick={createRow}>Add merchant</button>
      <br />
      <button onClick={deleteMerchant}>Delete merchant</button>
    </div>
  );
}
