const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');

// Importation des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Connexion à MongoDB Atlas
mongoose.connect('mongodb+srv://gahell:mdp23@cluster0.womlu.mongodb.net/dataBaseP6?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS signifie "Cross Origin Resource Sharing"
// Système de sécurité qui par défaut bloque les appels HTTP entre des serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;


