const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: 2, role: 'earner' },
  'myjwtsecret123',  
  { expiresIn: '1d' }
);

console.log('Generated Token:', token);
