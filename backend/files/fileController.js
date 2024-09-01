const crypto = require('crypto');

module.exports = {
  encryptFile: (req, res) => {
    console.log("Starting to encrypt");
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });

    // Encrypt the file and save it
    const aesKey = crypto.randomBytes(32);
    const aesIv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIv);

    req.on('data', (chunk) => {
      try {
        console.log("Writing chunk");
        res.write(cipher.update(chunk));
      } catch (err) {
        res.statusCode = 500;
        res.end(`Error during encryption: ${err.message}`);
      }
    });

    req.on('end', () => {
      try {
        console.log("Final chunk");
        res.write(cipher.final());
        res.end();
      } catch (err) {
        res.statusCode = 500;
        res.end(`Error finalizing encryption: ${err.message}`);
      }
    });

    req.on('error', (err) => {
      console.log("Error getting file");
      res.statusCode = 500;
      res.end(`Error receiving file: ${err.message}`);
    });

  },
};
