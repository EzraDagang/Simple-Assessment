const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

router.get("/table1", tableController.getTable1);
router.get("/table2", tableController.getTable2);

module.exports = router;