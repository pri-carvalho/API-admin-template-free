"use strict";

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const isAuth = require('../middleware/is-auth');

router.get('/projects', projectController.getprojects)
router.get('/project/:id', projectController.getprojectId)
router.put('/project/:id', isAuth, projectController.putprojectId)
router.delete('/project/:id', isAuth, projectController.deleteprojectId)

module.exports = router;