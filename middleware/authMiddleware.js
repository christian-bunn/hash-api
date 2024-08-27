// middleware/AuthMiddleware.js

const jwt = require("jsonwebtoken");
const secretKey = "T47VshhfrgY7t36ezB6kqa0T"; // same key as used in authController.js

module.exports = {
  check: (req, res, next) => {
    const token = req.cookies.authToken; // reading token from cookies

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
