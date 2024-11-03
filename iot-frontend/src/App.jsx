// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: '--',
    humidity: '--',
    smoke: '--',
    ldr: '--',
    fire: '--',
    pir: '--',
    timestamp: '--',
  });

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensor-data');
      setSensorData({
        temperature: response.data.temperature,
        humidity: response.data.humidity,
        smoke: response.data.smoke,
        ldr: response.data.ldr,
        fire: response.data.fire,
        pir: response.data.pir,
        timestamp: format(new Date(response.data.timestamp), 'PPpp'),
      });
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchSensorData();

    // Poll every 10 seconds
    const interval = setInterval(fetchSensorData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>IoT Sensor Dashboard</h2>
        <div className="sensor-data">
          <div className="data-item">
            <span className="label">Temperature:</span>
            <span className="value">{sensorData.temperature}°C</span>
          </div>
          <div className="data-item">
            <span className="label">Humidity:</span>
            <span className="value">{sensorData.humidity}%</span>
          </div>
          <div className="data-item">
            <span className="label">Smoke:</span>
            <span className="value">{sensorData.smoke} ppm</span>
          </div>
          <div className="data-item">
            <span className="label">LDR:</span>
            <span className="value">{sensorData.ldr}</span>
          </div>
          <div className="data-item">
            <span className="label">Fire:</span>
            <span className="value">{sensorData.fire ? 'Detected' : 'Clear'}</span>
          </div>
          <div className="data-item">
            <span className="label">PIR:</span>
            <span className="value">{sensorData.pir ? 'Motion Detected' : 'No Motion'}</span>
          </div>
          <div className="data-item">
            <span className="label">Last Updated:</span>
            <span className="value">{sensorData.timestamp}</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
