const express = require('express');
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiter: maximum of 5 requests per minute
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after a minute'
});

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
// Rate limiter: maximum of 10 requests per minute for protected routes
const protectedLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute'
});

router.get('/protected', protectedLimiter, protect, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
