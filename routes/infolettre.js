"use strict";

const express = require('express');
const router = express.Router();
const infolettreController = require('../controllers/infolettreController');
const isAuth = require('../middleware/is-auth');

router.get('/infolettres', infolettreController.getinfolettres)
router.get('/infolettre/:id', infolettreController.getinfolettreId)
router.post('/infolettre', isAuth, infolettreController.postinfolettre)
router.put('/infolettre/:id', isAuth, infolettreController.putinfolettreId)
router.delete('/infolettre/:id', isAuth, infolettreController.deleteinfolettreId)

module.exports = router;