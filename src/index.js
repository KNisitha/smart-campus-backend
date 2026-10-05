const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');

// ===============================
// LOAD MODELS
// ===============================
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


// ===============================
// LOAD ROUTES
// ===============================
const authRoutes = require('./routes/authRoutes');

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


// ===============================
// CREATE APP
// ===============================
const app = express();


// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());

app.use(express.json());


// ===============================
// REQUEST DEBUG LOGGER
// ===============================
app.use((req, res, next) => {

  console.log('========================================');
  console.log('REQUEST HIT:', req.method, req.url);
  console.log('========================================');

  next();
});


// ===============================
// AUTH ROUTES
// ===============================
app.use('/api/auth', authRoutes);


// ===============================
// USER / STUDENT / FACULTY ROUTES
// ===============================
app.use('/api/students', studentRoutes);

app.use('/api/faculty', facultyRoutes);

app.use('/api/departments', departmentRoutes);

app.use('/api/users', userRoutes);

app.use('/api/subjects', subjectRoutes);


// ===============================
// ACADEMIC ROUTES
// ===============================
app.use('/api/attendance', attendanceRoutes);

app.use('/api/assignments', assignmentRoutes);

app.use('/api/submissions', submissionRoutes);

app.use('/api/marks', marksRoutes);


// ===============================
// EVENT ROUTES
// ===============================
app.use('/api/events', eventRoutes);

app.use('/api/event-registrations', eventRegistrationRoutes);


// ===============================
// STUDENT SERVICE ROUTES
// ===============================
app.use('/api/leave-requests', leaveRequestRoutes);

app.use('/api/complaints', complaintRoutes);

app.use('/api/lost-found', lostFoundRoutes);


// ===============================
// NOTIFICATION ROUTES
// ===============================
app.use('/api/announcements', announcementRoutes);

app.use('/api/notifications', notificationRoutes);


// ===============================
// CAREER ROUTES
// ===============================
app.use('/api/career-profiles', careerProfileRoutes);


// ===============================
// ROOT API
// ===============================
app.get('/', (req, res) => {

  res.json({
    success: true,
    message: 'Smart Campus Backend APIs'
  });

});


// ===============================
// HEALTH CHECK
// ===============================
app.get('/api/health', (req, res) => {

  res.json({
    success: true,
    message: 'Smart Campus API is running'
  });

});


// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {

  console.log('❌ 404 ENDPOINT NOT FOUND:', req.method, req.url);

  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });

});


// ===============================
// PORT
// ===============================
const PORT = process.env.PORT || 5000;


// ===============================
// START SERVER
// ===============================
const startServer = async () => {

  try {

    await connectDB();

    app.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

    });

  } catch (error) {

    console.error(
      'Failed to start server:',
      error.message
    );

    process.exit(1);

  }

};


startServer();