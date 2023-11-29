"use strict";

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuth = require('../middleware/is-auth');

router.post('/login', authController.postLogin)
router.post('/signup', isAuth, authController.postSignup)

module.exports = router;