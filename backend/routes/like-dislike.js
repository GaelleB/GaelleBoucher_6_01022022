// Importation du package express
const express = require('express')

// Pour créer un nouvel objet routeur
const router = express.Router()

// Chemin vers le dossier Middleware
const auth = require('../middleware/auth')

// Chemin vers le dossier Controllers
const likeCtrl = require('../controllers/like-dislike')

router.post('/:id/like', auth, likeCtrl.likeStatus)

module.exports = router