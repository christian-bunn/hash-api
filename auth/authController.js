// auth/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../users/user");

const secretKey = "T47VshhfrgY7t36ezB6kqa0T";

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const generateAccessToken = (username, userId) => {
  return jwt.sign({ username, userId }, secretKey, { expiresIn: "1h" });
};

module.exports = {
  register: (req, res) => {
    const { username, password } = req.body;

    let encryptedPassword = encryptPassword(password);

    User.createUser({ username, password: encryptedPassword })
      .then((user) => {
        const accessToken = generateAccessToken(username, user.id);

        // Set Content-Type header to application/json
        res.setHeader('Content-Type', 'application/json');

        return res.status(200).json({
          status: true,
          result: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    User.findUser({ username })
      .then((user) => {
        if (!user) {
          console.log("User not found.");

          // Set Content-Type header to application/json
          res.setHeader('Content-Type', 'application/json');

          return res.status(404).json({
            status: false,
            error: "User not found."
          });
        }

        // Compare provided password with the stored hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          console.log("Invalid password.");

          res.setHeader('Content-Type', 'application/json');
          return res.status(401).json({
            status: false,
            error: "Invalid password."
          });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ username, userId: user.id }, secretKey, { expiresIn: "1h" });

        // Set JWT token as an HttpOnly cookie
        res.cookie('authToken', accessToken, {
          httpOnly: true,  // Prevents JavaScript access
          secure: process.env.NODE_ENV === 'production',   // Use true for production (with HTTPS)
          sameSite: 'Strict', // Helps prevent CSRF attacks; can adjust to 'Lax' or 'None' as needed
          maxAge: 3600000  // Cookie expiration time (1 hour in milliseconds)
        });

        console.log("Login successful, cookie set.");

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
          status: true,
          message: "Login successful"
        });
      })
      .catch((err) => {
        console.error("Error during login:", err);

        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
          status: false,
          error: err.message,
        });
      });
  },
};
