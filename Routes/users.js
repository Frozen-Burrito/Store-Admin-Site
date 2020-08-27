const express = require('express');
const router = express.Router();

const { 
    login_page, 
    register_page,

    register_handle,
    login_handle,
    logout_handle
} = require('../Controllers/authController');

// Login page
router.get('/login', login_page);

// Register page
router.get('/register', register_page);

// Register handle
router.post('/register', register_handle);

// Login handle
router.post('/login', login_handle);

// Logout handle
router.get('/logout', logout_handle);

module.exports = router;