import jwt from 'jsonwebtoken';
import connectDB from './mongodb.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

export const protect = async (req) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new Error('Not authorized to access this route');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      throw new Error('User no longer exists or is inactive');
    }

    return user;
  } catch (error) {
    throw new Error('Not authorized to access this route. Invalid token.');
  }
};

export const authorize = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new Error(`User role '${user.role}' is not authorized`);
  }
};
