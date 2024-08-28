// auth/routes.js

const express = require('express');
const AuthController = require('./authController');
const router = express.Router();

router.post('/signup', AuthController.register); // Ensure this line exists
router.post('/login', AuthController.login);

module.exports = router;
