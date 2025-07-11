require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const userController = require('./controllers/user');
const passageController = require('./controllers/passage');
const testController = require('./controllers/tests');
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5173'];


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin (like Postman)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 86400000 }
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/users', require('./controllers/user'));
app.use('/api/passages', passageController);
app.use('/api/tests', authMiddleware, testController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
