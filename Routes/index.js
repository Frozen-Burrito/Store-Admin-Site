const express = require('express');
const router = express.Router();

const { authView, protectedView } = require('../Middleware/auth');

router.get('/', ( req, res ) => {
    res.render('landing');
})

router.get('/dashboard', authView, ( req, res ) => {
    res.render('dashboard', { name: req.user.name })
})

router.get('/admin', protectedView('Admin'), ( req, res ) => {
    res.render('adminPanel', { name: req.user.name });
})

module.exports = router;