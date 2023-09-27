'use strict';

// 3rd Party Resources
require('dotenv').config();
const { db } = require('./auth/models/index.js');
const { generateTimeSensitiveJWT, verifyJWT } = require('./auth/middleware/jwt.js');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}));
// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  startup: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};