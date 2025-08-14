const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

router.post('/signup', register);
router.post('/signin', login);

// Example protected route to check current user
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;


