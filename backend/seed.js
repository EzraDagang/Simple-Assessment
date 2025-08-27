require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const sequelize = require("./db");
const Table1 = require("./models/Table1");

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected!");

    const results = [];

    fs.createReadStream(path.join(__dirname, "data/Table_Input.csv"))
      .pipe(csv())
      .on("data", (row) => {
        results.push({ index: row["Index #"], value: Number(row.Value) });
      })
      .on("end", async () => {
        try {
          await Table1.bulkCreate(results);
          console.log("table 1 seeded from CSV");
          process.exit();
        } catch (error) {
          console.error("Error inserting into DB:", error);
        }
      })

  } catch (error) {
    console.error(error);
  }
}

seed();
