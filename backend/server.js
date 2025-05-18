const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { google } = require('googleapis');
require('dotenv').config();

const commentRoutes = require('./routes/comments');
const noteRoutes = require('./routes/notes');
const videoRoutes = require('./routes/video');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true, // to send cookies with CORS
}));
app.use(express.json());

// Add cookie-session middleware for storing OAuth tokens
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'secret_key_here'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  sameSite: 'none', // 👈 Required for cross-site cookies
  secure: true, 
}));

// Setup OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/userinfo.profile',
];

// OAuth login route - Step 1: Redirect user to Google consent screen
app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // to get refresh token
    scope: SCOPES,
  });
  res.redirect(url);
});

// OAuth callback route - Step 2: Handle Google's response
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  try {
    const { tokens } = await oauth2Client.getToken(code);
    req.session.tokens = tokens; // Save tokens in sessio
    res.redirect('http://localhost:3000/'); // redirect to frontend after login
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('Authentication failed');
  }
});
app.get('/auth/status', (req, res) => {
  if (req.session.tokens) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

// Middleware to check authentication before protected API routes
function checkAuth(req, res, next) {
  if (!req.session.tokens) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  oauth2Client.setCredentials(req.session.tokens);
  next();
}

// Use this middleware for routes that need OAuth tokens
app.use('/api/comments', checkAuth, commentRoutes);
app.use('/api/notes', checkAuth, noteRoutes);
app.use('/api/video', checkAuth, videoRoutes);

// For public routes that don't require auth, you can add them separately if any

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log('Server running on port', process.env.PORT || 5000)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
