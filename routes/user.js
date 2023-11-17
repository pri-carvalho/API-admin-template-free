"use strict";

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');

router.get('/users', isAuth, userController.getUsers)
router.get('/user/profile', isAuth, userController.getUserProfile)
router.get('/user/:id', isAuth, userController.getUserId)
router.put('/user/:id', isAuth, userController.putUserId)
router.delete('/user/:id', isAuth, userController.deleteUserId)

module.exports = router;