const crypto = require('crypto');

module.exports = {
  encryptFile: (req, res) => {
    // Encrypt the file and save it
    const aesKey = crypto.randomBytes(32);
    const aesIv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-ccm', aesKey, aesIv, {
      authTagLength: 16,
    });

    req.on('data', (chunk) => {
      try {
        res.write(cipher.update(chunk));
      } catch (err) {
        res.statusCode = 500;
        res.end(`Error during encryption: ${err.message}`);
      }
    });

    req.on('end', () => {
      try {
        res.write(cipher.final());
        res.write(cipher.getAuthTag());
        res.end();
      } catch (err) {
        res.statusCode = 500;
        res.end(`Error finalizing encryption: ${err.message}`);
      }
    });

    req.on('error', (err) => {
      res.statusCode = 500;
      res.end(`Error receiving file: ${err.message}`);
    });

  },
};
