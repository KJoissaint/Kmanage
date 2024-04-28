const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signup, signin } = require('../controllers/authController');

// POST api/auth/signup
// Public
router.post(
    '/signup',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    signup
);

// POST api/auth/signin
// Public
router.post(
    '/signin',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    signin
);

module.exports = router;
