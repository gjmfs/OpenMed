const express = require("express");
const { OpenMed } = require("../controllers/OpenMedController");
const router = express.Router();

router.post("/chat", OpenMed);

module.exports = router;
