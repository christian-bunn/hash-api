const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { Sequelize } = require("sequelize");
const User = require("./users/user");
const UserRoutes = require("./users/routes");
const FileRoutes = require("./files/routes");
const AuthRoutes = require("./auth/routes");

app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(cors({
  origin: process.env.ORIGIN || 'http://127.0.0.1:8080', // allowing requests from front end
  credentials: true, // allows for cookies and credentials
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));


// setup routes and database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db",
});

User.initialise(sequelize);

sequelize.sync().then(() => {
  console.log("Database synced!");

  // start the server after database sync
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Routes
app.use("/", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/files", FileRoutes);

// status endpoint. allows for check if server is running
app.get('/status', (request, response) => {
  response.json({ "Status": "API Running" });
});

app.post('/logout', (req, res) => {
  // Clear the auth token cookie
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    path: '/',
  });

  // Respond with a success message
  res.status(200).json({ message: 'Logged out successfully' });
  // console.log("the logout function was called");
});
