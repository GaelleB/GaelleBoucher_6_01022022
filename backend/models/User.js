// Importation du package mongoose
const mongoose = require('mongoose')

// Importation du package mongoose-unique-validator
// Ajoute une validation de pré-enregistrement pour les champs uniques dans un schéma Mongoose
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true }, // Adresse email unique
	password: { type: String, required: true },
});

// On applique le plugin avant l'exportation
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);