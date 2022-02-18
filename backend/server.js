// Inportation du package http de Node pour la création d'un serveur Node
const http = require('http');

// Importation de l'index de l'application
const app = require('./app');

app.set('port', process.env.PORT || 3000);

// Un serveur Node démarre avec la méthode createServer du package http
const server = http.createServer(app);

// Ecoute le port (environnement PORT, ou 3000)
server.listen(process.env.PORT || 3000);