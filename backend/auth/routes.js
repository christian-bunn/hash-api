// auth/routes.js

const express = require('express');
const AuthController = require('./authController');
const router = express.Router();

router.post('/signup', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
