import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";

const Table = () => {
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  useEffect(() => {
    const fetchTable1 = async () => {
      try {
        const res = await fetch("/api/table1");
        const data = await res.json();
        setTable1Data(data);

      } catch (error) {
        console.error("Error fetching Table 1:", error);
      }
    };
    fetchTable1();
  }, []);

  useEffect(() => {
    const fetchTable2 = async () => {
      try {
        const res = await fetch("/api/table2");
        const data = await res.json();
        const formattedData = Object.keys(data).map(key => ({ category: key, value: data[key], }));
        setTable2Data(formattedData);

      } catch (err) {
        console.error("Error fetching Table2:", err);
      }

    }; fetchTable2();
  }, []);

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
      <table className={`${styles.table} ${styles.table2}`}>
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
