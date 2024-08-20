// files/routes.js

const router = require("express").Router();
const FileController = require("./fileController");

router.post("/upload", FileController.uploadFile);

module.exports = router;
