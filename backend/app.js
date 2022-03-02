// Importation des packages installés de Node.js

// Importation du package express
// Cadre d'application Web Node.js minimal et flexible fournissant un ensemble robuste de fonctionnalités
// Pour développer des applications Web et mobiles
// Facilite le développement rapide d'applications Web basées sur Node.
const express = require('express');

const app = express();

// Importation du package mongoose
// Bibliothèque de programmation JavaScript orientée objet
// Créant une connexion entre MongoDB et le framework d'application Web Express
const mongoose = require('mongoose');

// Importation et configuration de dotenv
// Module sans dépendance qui charge les variables d'environnement d'un fichier .env dans process.env
require('dotenv').config()

// Importation du package path
// Pour accéder et interagir avec le système de fichiers
const path = require('path');

// Importation des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const likeDislike = require('./routes/like-dislike');

// Connexion à MongoDB Atlas
mongoose.connect(process.env.DB_URL, // process.env a les clés et les valeurs que j'ai défini dans mon fichier .env 
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS signifie "Cross Origin Resource Sharing"
// Système de sécurité qui par défaut bloque les appels HTTP entre des serveurs
app.use((req, res, next) => {
    // Accès à l'API
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Headers autorisés
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Méhthodes possibles en utilisant le CRUD
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parse les données en json
app.use(express.json());

// Servir des images dans le répertoire nommé "images"
// Utilisation de la fonction de logiciel intermédiaire, express.static intégré dans Express
// Utilisation de __dirname pour pointer vers le répertoire "images" qui contient les fichiers statiques.
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/sauces', likeDislike);
app.use('/api/auth', userRoutes);

// Module est une variable qui représente le module actuel
// Exports est un objet qui sera exposé en tant que module
module.exports = app;