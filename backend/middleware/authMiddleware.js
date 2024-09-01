// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = "T47VshhfrgY7t36ezB6kqa0T"; // secrect key

module.exports = {
  check: (req, res, next) => {
      console.log("Cookies received:", req.cookies); // log received cookies
      const token = req.cookies.authToken; // get token from cookies

      if (!token) {
          console.log("No token provided. Cookies:", req.cookies);
          return res.status(401).json({
              status: false,
              error: "Access denied. No token provided."
          });
      }

      jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
              console.log("Invalid token");
              return res.status(403).json({
                  status: false,
                  error: "Invalid token."
              });
          }
          req.user = decoded; // saving user data
          console.log("Token verified, user authenticated.");
          next(); // proceed to the next middleware/route handler
      });
  }
};

