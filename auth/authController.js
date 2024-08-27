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

        return res.status(200).json({
          status: true,
          result: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    // find user by username
    User.findUser({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            status: false,
            error: "User not found."
          });
        }

        // Compare provided password with the stored hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            status: false,
            error: "Invalid password."
          });
        }

        // generation of JWT token
        const accessToken = jwt.sign({ username, userId: user.id }, secretKey, { expiresIn: "1h" });

        // making JWT token as a httponly cookie
        res.cookie('authtoken', accessToken, {
          httpOnly: true, // prevent javascript access
          secure: true, // ensure cookie is sent over https
          sameSite: 'Strict', 
          maxAge: 3600000 // expire in 1 hour
        });

        return res.status(200).json({
          status: true,
          message: "Login successful",
          token: accessToken,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err.message,
        });
      });
  },
};
