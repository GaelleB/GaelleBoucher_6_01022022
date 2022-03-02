// Importation du package express
const express = require('express');

// Pour créer un nouvel objet routeur
const router = express.Router();

// Chemin vers le dossier Middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Chemin vers le dossier Controllers
const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);

module.exports = router;