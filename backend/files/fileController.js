const crypto = require('crypto');

module.exports = {
  encryptFile: (req, res) => {
    const logWithTimestamp = (message) => {
      console.log(`[${new Date().toISOString()}] ${message}`);
    };

    logWithTimestamp("Starting to encrypt");
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });

    const aesKey = crypto.randomBytes(32);
    const aesIv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIv);

    let shouldContinue = true;

    req.on('data', (chunk) => {
      try {
        console.time("Writing chunk");

        shouldContinue = res.write(cipher.update(chunk));

        if (!shouldContinue) {
          req.pause();
          res.once('drain', () => req.resume());
        }
      } catch (err) {
        res.statusCode = 500;
        res.end(`Error during encryption: ${err.message}`);
      }
    });

    req.on('end', () => {
      try {
        logWithTimestamp("Final chunk");
        res.write(cipher.final());
        res.end();
      } catch (err) {
        res.statusCode = 500;
        res.end(`Error finalizing encryption: ${err.message}`);
      }
    });

    req.on('error', (err) => {
      logWithTimestamp("Error receiving file");
      res.statusCode = 500;
      res.end(`Error receiving file: ${err.message}`);
    });
  },
};
