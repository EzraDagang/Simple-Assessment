const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Table1 = sequelize.define("Table1", {
    index: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Table1;