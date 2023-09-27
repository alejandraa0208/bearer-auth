const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET;
const tokenDuration = process.env.TOKEN_DURATION || '15m';

function generateTimeSensitiveJWT(userData) {
  const token = jwt.sign(userData, secretKey, { expiresIn: tokenDuration });
  return token;
}   

function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateTimeSensitiveJWT,
    verifyJWT,
};