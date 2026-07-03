const express = require("express");

const router = express.Router();

const {

    analyzeEmail,
    getHistory

} = require("../controllers/analyzerController");

router.post("/", analyzeEmail);

router.get("/history", getHistory);

module.exports = router;