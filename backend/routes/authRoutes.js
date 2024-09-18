const express = require('express');
const { signup, signin } = require('../controllers/authController');

const router = express.Router();

// Signup Router
router.post('/signup', signup);

// Signin Router
router.post('/signin', signin);

module.exports = router;