// index.js - Main application file
const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Environment variable for your main server URL (set this in Render dashboard)
// Default set to your dischecker application's token-checker endpoint
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL || 'https://dischecker.onrender.com/token-checker';

// Basic home route
app.get('/', (req, res) => {
  res.send('Dummy server is running! This server helps keep your main application awake.');
});

// Endpoint for your main server to ping back
app.get('/ping', (req, res) => {
  console.log('Received ping from main server at: ' + new Date().toISOString());
  res.send('pong');
});

// Start the server
app.listen(port, () => {
  console.log(`Dummy server running on port ${port}`);
  console.log(`Will ping main server at: ${MAIN_SERVER_URL}`);
});

// Function to ping your main server every 10 minutes
function pingMainServer() {
  console.log('Attempting to ping main server at: ' + new Date().toISOString());
  
  axios.get(MAIN_SERVER_URL)
    .then(response => {
      console.log('Successfully pinged main server. Response:', response.data);
    })
    .catch(err => {
      console.error('Failed to ping main server:', err.message);
    });
}

// Initial ping after 15 seconds (gives time for both servers to start up)
setTimeout(pingMainServer, 15 * 1000);

// Then run the ping function every 10 minutes
setInterval(pingMainServer, 10 * 60 * 1000);
