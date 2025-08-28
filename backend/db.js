const { Sequelize } = require("sequelize");

const connectionString = process.env.DATABASE_URL ||
    `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`;

const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: false,
    dialectOptions: process.env.DATABASE_URL ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } 

    : {},
});

module.exports = sequelize;