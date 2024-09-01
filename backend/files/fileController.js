const crypto = require('crypto');

module.exports = {
  encryptFile: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    // Encrypt the file and save it
    const aesKey = crypto.randomBytes(32);
    const aesIv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ccm', aesKey, aesIv);
    req.pipe(cipher).pipe(res);
  },
};
