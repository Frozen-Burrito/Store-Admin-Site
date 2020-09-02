const express = require('express');
const router = express.Router();

const { 
    loginHandle,
    registerHandle,
    getUserList,
    userDetails,
    logoutHandle
} = require('../Controllers/authController');

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
router.post('/login', loginHandle);

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
router.post('/register', registerHandle);

// @desc    Get list of all users 
// @route   GET /api/v1/auth/users
// @access  Protected
router.get('/users', getUserList);

// @desc    Get user info
// @route   GET /api/v1/auth/users/details/:id
// @access  Protected
router.get('/users/details/:id', userDetails);

// @desc    Logout current user
// @route   GET /api/v1/auth/logout
// @access  Public
router.get('/logout', logoutHandle);

module.exports = router;