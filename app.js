const express = require('express');
const app = express();

// Parse JSON payloads
app.use(express.json());

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// Define the /status endpoint
app.get('/status', (request, response) => {
  const status = {
    "Status": "API Running"
  };
  
  response.send(status);
});
