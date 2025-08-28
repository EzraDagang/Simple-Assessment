import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";

const Table = () => {
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  useEffect(() => {
    const fetchTable1 = async () => {
      try {
        const res = await fetch("http://localhost:5000/table1");
        const data = await res.json();
        setTable1Data(data);
      } catch (error) {
        console.error("Error fetching Table 1:", error);
      }
    };
    fetchTable1();
  }, []);

useEffect(() => {
    if (table1Data.length === 0) return;

    const getValue = (idx) => {
      const item = table1Data.find((row) => row.index === idx);
      return item ? item.value : 0;
    };

    const computedTable2 = [
      { category: "Alpha", value: getValue("A5") + getValue("A20") },
      { category: "Beta", value: Math.floor(getValue("A15") / getValue("A7")) },
      { category: "Charlie", value: getValue("A13") * getValue("A12") },
    ];

    setTable2Data(computedTable2);
  }, [table1Data]);

  return (
    <div className={styles.tableContainer}>
      <h2>Table 1</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Index #</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {table1Data.map((row) => (
            <tr key={row.index}>
              <td className={styles.indexColumn}>{row.index}</td>
              <td className={styles.valueColumn}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.title}>Table 2</h2>
      <table className= {`${styles.table} ${styles.table2}`}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {table2Data.map((row) => (
            <tr key={row.category}>
              <td className={styles.categoryColumn}>{row.category}</td>
              <td className={styles.valueRight}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
