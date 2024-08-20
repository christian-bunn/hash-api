// users/routes.js

const router = require("express").Router();
const UserController = require("./userController");
const AuthenticatedMiddleware = require("../middleware/authMiddleware");

router.get("/", AuthenticatedMiddleware.check, UserController.getAllUsers);

module.exports = router;
