require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const sequelize = require("./db");
const Table1 = require("./models/Table1");

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({ index: row["Index #"], value: Number(row.Value) });
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    // Option 1: Truncate table first (safe for repeated deploys)
    await Table1.sync({ force: true });

    // Read CSV
    const csvPath = path.join(__dirname, "data/Table_Input.csv");
    const data = await readCSV(csvPath);

    // Bulk insert
    await Table1.bulkCreate(data);
    console.log("Table1 seeded from CSV successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
