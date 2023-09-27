'use strict';

const jwt = require('jsonwebtoken');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { 
      throw new Error('Invalid Login');
    }

    const token = req.headers.authorization.split(' ')[1];
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};