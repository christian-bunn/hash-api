const crypto = require('crypto');
const { pipeline } = require('stream');
const { Transform } = require('stream');

module.exports = {
  encryptFile: (req, res) => {
    const logWithTimestamp = (message) => {
      console.log(`[${new Date().toISOString()}] ${message}`);
    };

    logWithTimestamp("Starting to encrypt");
    logWithTimestamp(`Transfer-Encoding: ${req.headers['transfer-encoding'] || 'not set'}`);
    logWithTimestamp(`Content-Type: ${req.headers['content-type'] || 'not set'}`);
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });

    // Create a custom Transform stream to perform the encryption 10 times
    const encryptStream = new Transform({
      transform(chunk, encoding, callback) {
        let encryptedChunk = chunk;
        for (let i = 0; i < 10; i++) {
          const aesKey = crypto.randomBytes(32);
          const aesIv = crypto.randomBytes(16);
          const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIv);
          encryptedChunk = Buffer.concat([cipher.update(encryptedChunk), cipher.final()]);
        }
        callback(null, encryptedChunk);
      }
    });

    pipeline(
      req,
      encryptStream,
      res,
      (err) => {
        if (err) {
          logWithTimestamp(`Error during encryption: ${err.message}`);
          res.statusCode = 500;
          res.end(`Error during encryption: ${err.message}`);
        } else {
          logWithTimestamp("Encryption completed successfully");
          res.end();
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
