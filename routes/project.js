"use strict";

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const isAuth = require('../middleware/is-auth');

router.get('/projects', projectController.getProjects)
router.get('/project/:id', projectController.getProjectId)
router.post('/project', isAuth, projectController.postProject)
router.put('/project/:id', isAuth, projectController.putProjectId)
router.delete('/project/:id', isAuth, projectController.deleteProjectId)

module.exports = router;