// Importation du package bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');

// Importation du package jsonwebtoken 
// Pour créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

const User = require('../models/User') // userSchema

// Importation et configuration de dotenv
require('dotenv').config()

// Enregistrement d'un compte
exports.signup = (req, res, next) => {
    // Crypte le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // Création d'un nouvel utilisteur (mail + mot de passe)
        const user = new User({
            email: req.body.email, 
            password: hash // Mot de passe hashé
        });
        // Enregistrement de l'utilisateur 
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    // Erreur server
    .catch(error => res.status(500).json({ error }));
};

// Connexion au compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // Comparaison du mot de passe entré avec celui enregistré
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Contient l'identifiant de l'utilisateur et un token
            res.status(200).json({
                userId: user._id,
                // Encode un nouveau token grâce à jswonwebtoken
                token: jwt.sign(
                    { userId: user._id },
                    'SECRET_TOKEN',
                    { expiresIn: '24h' } // Reconnexion dans 24h
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};