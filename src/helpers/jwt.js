import jwt from 'jsonwebtoken';

const generateToken = (saman) => {
  return jwt.sign(saman, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
