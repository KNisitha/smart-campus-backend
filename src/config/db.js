const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    console.log('MONGO_URI available:', !!uri);

    const conn = await mongoose.connect(uri);

    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to Mongo: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;