const express = require("express");

const systemController = require("../controllers/system.controller");

const router = express.Router();

router.get("/health", systemController.getHealth);
router.get("/api/version", systemController.getVersion);

module.exports = router;
