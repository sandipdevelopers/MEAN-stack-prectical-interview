const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { sendError, sendSuccess } = require('../utils/services');
require('dotenv').config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};



// Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    
    const token = generateToken(user._id);

    sendSuccess(res, 201, 'User created successfully', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    sendError(res, 400, 'USER_CREATION_FAILED', err.message);
  }
};



// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (!user || !(await user.matchPassword(password))) {
      return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }
    const token = generateToken(user._id);
    sendSuccess(res, 200, 'Login successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    sendError(res, 400, 'LOGIN_FAILED', err.message);
  }
};
