const crypto = require('crypto');
const fs = require('fs');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

const sessionSecretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Session Secret Key:', sessionSecretKey);

const envContents = `
SECRET=${secretKey}
SESSION_SECRET=${sessionSecretKey}
`;

fs.writeFileSync('.env', envContents);
