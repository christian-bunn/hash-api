// auth/routes.js

const router = require("express").Router();
const AuthController = require("./authController");

router.post("/signup", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;