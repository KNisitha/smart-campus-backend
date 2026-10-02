const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');

// Register models
require('./models/User');
require('./models/Department');
require('./models/Student');
require('./models/Faculty');
require('./models/Subject');
require('./models/Attendance');
require('./models/Assignment');
require('./models/Submission');
require('./models/Marks');
require('./models/Event');
require('./models/EventRegistration');
require('./models/LeaveRequest');
require('./models/Complaint');
require('./models/LostFound');
require('./models/Announcement');
require('./models/Notification');
require('./models/CareerProfile');

// Routes
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userRoutes = require('./routes/userRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const attendanceRoutes = require('./routes/attendanceRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const marksRoutes = require('./routes/marksRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventRegistrationRoutes = require('./routes/eventRegistrationRoutes');
const leaveRequestRoutes = require('./routes/leaveRequestRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const careerProfileRoutes = require('./routes/careerProfileRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// APIs
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);

app.use('/api/attendance', attendanceRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-registrations', eventRegistrationRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/career-profiles', careerProfileRoutes);

// Home
app.get('/', (req, res) => {
  res.send('Smart Campus Backend APIs');
});

// Health
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