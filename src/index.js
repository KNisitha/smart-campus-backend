const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');

// Register models
require('./models/User');
require('./models/Department');
require('./models/Student');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Student Routes
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Smart Campus Backend APIs');
});

// Health API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Smart Campus API is running'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();