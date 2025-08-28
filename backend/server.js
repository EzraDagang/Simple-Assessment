require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./db");
const tableRoutes = require("./routes/table");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", tableRoutes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected!");
        await sequelize.sync({alter: true});
        console.log("Tables synced!");

        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
}

startServer();