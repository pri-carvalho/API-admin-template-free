"use strict";

const express = require('express');
const router = express.Router();
const infolettreController = require('../controllers/infolettreController');
const isAuth = require('../middleware/is-auth');

router.get('/infolettres', isAuth, infolettreController.getInfolettres)
router.get('/infolettre/:id', isAuth, infolettreController.getInfolettreId)
router.post('/infolettre', isAuth, infolettreController.postInfolettre)
router.put('/infolettre/:id', isAuth, infolettreController.putInfolettreId)
router.delete('/infolettre/:id', isAuth, infolettreController.deleteInfolettreId)

module.exports = router;