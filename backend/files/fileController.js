const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024 // Adjust file size limit as needed
  }
}).single('file');

// Load the RSA public key
const publicKeyPath = path.join(__dirname, '../keys/public.pem');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

module.exports = {
  uploadFile: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({
          status: false,
          error: 'File upload failed.',
        });
      }

      const filePath = req.file.path;
      const encryptedFilePath = `${filePath}.enc`;

      // Encrypt the file and save it
      const aesKey = crypto.randomBytes(32);
      const aesIv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIv);
      const inputStream = fs.createReadStream(filePath);
      const outputStream = fs.createWriteStream(encryptedFilePath);

      inputStream.pipe(cipher).pipe(outputStream);

      outputStream.on('finish', () => {
        // Respond with the download link
        const downloadLink = `/files/download/${path.basename(encryptedFilePath)}`;
        res.status(200).json({ downloadLink });
      });

      outputStream.on('error', (error) => {
        console.error('Encryption error:', error);
        res.status(500).json({
          status: false,
          error: 'File encryption failed.',
        });
      });
    });
  },

  downloadFile: (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    // Handle aborted requests to avoid crashing the server
    req.on('close', () => {
      console.log('Client aborted the request');
    });

    res.download(filePath, filename, (err) => {
      if (err) {
        if (err.code === 'ECONNABORTED') {
          console.log('Download aborted by the client');
        } else {
          console.error('Download error:', err);
          // Avoid sending a response if headers are already sent
          if (!res.headersSent) {
            res.status(500).json({
              status: false,
              error: 'File download failed.',
            });
          }
        }
      }
    });
  }
};
