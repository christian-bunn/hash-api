const express = require('express');
const router = express.Router();
const FileController = require("./fileController");
const AuthMiddleware = require("../middleware/authMiddleware");

router.post("/upload", AuthMiddleware.check, FileController.uploadFile);

module.exports = router;
