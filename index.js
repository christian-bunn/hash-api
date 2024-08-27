const express = require('express');
const cors = require('cors');
const app = express();
const { Sequelize } = require("sequelize");
const User = require("./users/user");
const UserRoutes = require("./users/routes");
const FileRoutes = require("./files/routes");
const AuthRoutes = require("./auth/routes");


app.use(express.json());
app.use(cors());

// listen on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db",
});

User.initialise(sequelize);

sequelize.sync().then(() => {
  console.log("Database synced!");
  app.listen(3000, () => console.log("Server running on port 3000"));
});

// status endpoint to test if api is running
app.get('/status', (request, response) => {
  const status = {
    "Status": "API Running"
  };
  
  response.send(status);
});

app.use("/", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/files", FileRoutes);
