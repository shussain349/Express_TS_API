import jwt from 'jsonwebtoken';

// Define a secret key for JWT
const secretKey = 'syedKazmi';

// Define a payload for the JWT
const payload = {
  id : 786,
  username: 'Syed_Irfan',
  email: 'syed@gmail.com'
};

// Generate the JWT
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log(token);