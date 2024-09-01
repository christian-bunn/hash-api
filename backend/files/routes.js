const express = require('express');
const router = express.Router();
const FileController = require('./fileController');
const AuthMiddleware = require('../middleware/authMiddleware');

// File upload route
router.post('/upload', AuthMiddleware.check, FileController.encryptFile);

module.exports = router;
