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

// Configure CORS middleware
app.use(cors({
  origin: 'http://127.0.0.1:8080', // Allow requests from your frontend origin
  credentials: true, // Allow cookies and credentials
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})

// app.use(cors({
//   origin: '*', // Allow all origins
//   credentials: true // Allow cookies to be sent and received
// }));


// Setup routes and database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db",
});

User.initialise(sequelize);

sequelize.sync().then(() => {
  console.log("Database synced!");

  // Start the server after database sync
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Routes
app.use("/", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/files", FileRoutes);

// Status endpoint
app.get('/status', (request, response) => {
  response.json({ "Status": "API Running" });
});
