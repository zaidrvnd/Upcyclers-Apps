/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    // Simple connection without deprecated options
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB Connected Successfully');

    // Connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected from DB');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;