const mongoose = require('mongoose')

// Onn ne peut s'inscrire qu'avec une seule adresse mail
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true }, // On ne peut s'inscrire qu'avec une seule adresse mail avec unique:true
	password: { type: String, required: true },
});

// On applique le plugin avant l'exportation
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);