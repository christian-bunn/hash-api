const crypto = require('crypto');
const { pipeline } = require('stream');

module.exports = {
  encryptFile: (req, res) => {
    const logWithTimestamp = (message) => {
      console.log(`[${new Date().toISOString()}] ${message}`);
    };

    logWithTimestamp("Starting to encrypt");
    logWithTimestamp(`Transfer-Encoding: ${req.headers['transfer-encoding'] || 'not set'}`);
    logWithTimestamp(`Content-Type: ${req.headers['content-type'] || 'not set'}`);
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    const aesKey = crypto.randomBytes(32);
    const aesIv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIv);

    pipeline(
      req,
      cipher,
      res,
      (err) => {
        if (err) {
          logWithTimestamp(`Error during encryption: ${err.message}`);
          res.statusCode = 500;
          res.end(`Error during encryption: ${err.message}`);
        } else {
          logWithTimestamp("Encryption completed successfully");
        }
      }
    );

    req.on('error', (err) => {
      logWithTimestamp(`Error receiving file: ${err.message}`);
      res.statusCode = 500;
      res.end(`Error receiving file: ${err.message}`);
    });
  },
};
