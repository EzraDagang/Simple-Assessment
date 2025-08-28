require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const sequelize = require("./db");
const tableRoutes = require("./routes/table");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", tableRoutes);

const staticPath = path.join(__dirname, "../frontend/dist");

if (require("fs").existsSync(staticPath)) {
    app.use(express.static(staticPath));
    // Serve index.html for any non-API route
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });
} else {
    console.warn("Warning: no frontend build found (dist or build). Make sure you run the frontend build before deploy.");
}

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected!");
        await sequelize.sync({ alter: true });
        console.log("Tables synced!");

        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

    } catch (error) {
        console.error("Unable to connect to the database: ", error);
        process.exit(1);
    }
}

startServer();