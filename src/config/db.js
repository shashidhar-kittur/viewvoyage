import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/viewvoyage';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 