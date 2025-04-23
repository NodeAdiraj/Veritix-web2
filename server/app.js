const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const webauthnRoutes = require('./routes/webauthn');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend URL (adjust accordingly)
  credentials: true
}));

// MongoDB connection using the provided URI
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error: ', err);
});

// Session setup
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } //1day
}));

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/webauthn', webauthnRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});


// Start server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3001');
});