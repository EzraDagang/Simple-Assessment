const Table1 = require("../models/Table1");

exports.getTable1 = async (req, res) => {
    try {
        const rows = await Table1.findAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTable2 = async (req, res) => {
    try {
        const rows = await Table1.findAll();
        const table2 = {
            Alpha: rows.find(r => r.index === "A5").value + rows.find(r => r.index === "A20").value,
            Beta: Math.floor(rows.find(r => r.index === "A15").value / rows.find(r => r.index === "A7").value),
            Charlie: rows.find(r => r.index === "A13").value * rows.find(r => r.index === "A12").value,
        };
        res.json(table2);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};