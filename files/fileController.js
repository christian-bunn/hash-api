// files/fileController.js

const multer = require("multer");
const path = require("path");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single('file');

module.exports = {
  uploadFile: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          error: err.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: "File uploaded successfully!",
        filePath: req.file.path,
      });
    });
  }
};
