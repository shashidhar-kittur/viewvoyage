import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/viewvoyage';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Database Status Endpoint
let serverStartTime = Date.now();

app.get('/api/db-status', async (req, res) => {
  try {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - serverStartTime) / 1000; // Convert to seconds
    
    if (elapsedTime > 10) {
      return res.status(404).json({ message: 'Database status check expired' });
    }

    const status = mongoose.connection.readyState;
    res.json({
      status: status === 1 ? 'Connected' : 'Disconnected',
      readyState: status,
      timeRemaining: Math.max(0, 10 - elapsedTime)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  serverStartTime = Date.now(); // Reset start time when server restarts
  connectDB();
}); 