// files/fleController.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single('file');

const calculateFileHash = (filePath) => {
  return new Promise((resolve, reject) => {
    // create SHA-256 hash instance
    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(filePath);

    // update hash with data read from file
    fileStream.on('data', (data) => {
      hash.update(data);
    });

    //return final hash value
    fileStream.on('end', () => {
      resolve(hash.digest('hex'));
    });

    // return as a promise
    fileStream.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = {
  uploadFile: (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          error: err.message,
        });
      }

      try {
        // calculate the hash of the uploaded file
        const fileHash = await calculateFileHash(req.file.path);

        return res.status(200).json({
          status: true,
          message: "File uploaded successfully!",
          filePath: req.file.path,
          fileHash: fileHash  // returing file hash
        });
      } catch (hashError) {
        return res.status(500).json({
          status: false,
          error: hashError.message,
        });
      }
    });
  }
};
