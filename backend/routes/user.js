// Importation du package express
const express = require('express');

// Pour créer un nouvel objet routeur
const router = express.Router();

// Chemin vers le dossier Controllers
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;