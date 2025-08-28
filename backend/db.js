const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Production (Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // Render Postgres requires SSL
        rejectUnauthorized: false, // allow self-signed
      },
    },
  });
  console.log("Using DATABASE_URL for connection.");
} else {
  // Local development
  sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      dialect: "postgres",
      logging: false,
    }
  );
  console.log("Using local .env DB configuration.");
}

module.exports = sequelize;