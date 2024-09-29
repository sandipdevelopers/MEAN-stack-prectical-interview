const express = require('express');
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', protect, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
