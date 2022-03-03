// Importation du package jsonwebtoken 
// Moyen sécurisé d'authentifier les utilisateurs et de partager des informations
const jwt = require('jsonwebtoken');

// Importation et configuration de dotenv
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extraction du token dans le header, split pour récupérer tout après l'espace dans le header
        const decodedToken = jwt.verify(token, 'SECRET_TOKEN'); // Décodage du token
        const userId = decodedToken.userId; // Extraction de l'ID utilisateur du token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Identifiant invalide';
        } else {
            next();
        }
    } catch {
        // Erreur
        res.status(401).json({
            error: new Error('Requête invalide !')
        });
    }
};