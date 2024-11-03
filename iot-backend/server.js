// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for the latest sensor data
let latestSensorData = {};

// Endpoint to receive data from Arduino
app.post('/api/sensor-data', (req, res) => {
  const {
    temperature,
    humidity,
    smoke,
    ldr,
    fire,
    pir,
    timestamp,
  } = req.body;

  // Validate required fields
  if (
    temperature === undefined ||
    humidity === undefined ||
    smoke === undefined ||
    ldr === undefined ||
    fire === undefined ||
    pir === undefined
  ) {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  latestSensorData = {
    temperature,
    humidity,
    smoke,
    ldr,
    fire,
    pir,
    timestamp: timestamp || new Date(),
  };
  console.log('Received sensor data:', latestSensorData);

  res.status(200).json({ message: 'Data received successfully' });
});

// Endpoint to get the latest sensor data
app.get('/api/sensor-data', (req, res) => {
  res.status(200).json(latestSensorData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
