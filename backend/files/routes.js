const express = require('express');
const router = express.Router();
const FileController = require('./fileController');
const AuthMiddleware = require('../middleware/authMiddleware');

// File upload route
router.post('/upload', AuthMiddleware.check, FileController.uploadFile);

// File download route
router.get('/download/:filename', AuthMiddleware.check, FileController.downloadFile);

module.exports = router;
