// middleware/AuthMiddleware.js

const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // Same as used in AuthController

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Auth headers not provided in the request.'
        }
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Token not provided.'
        }
      });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: {
            message: 'Invalid token provided.'
          }
        });
      }
      req.user = user;
      next();
    });
  }
};
