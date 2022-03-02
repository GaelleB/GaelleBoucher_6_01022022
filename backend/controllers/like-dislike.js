const Sauce = require('../models/Sauce') // sauceShema

// L'utilisateur peut liker, disliker, ou annuler
exports.likeStatus = (req, res) => {
	const like = req.body.like
	const userId = req.body.userId

	// Recherche de la sauce sélectionnée
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			// Vérification de l'ID utilisateur avec .find
			let userLike = sauce.usersLiked.find((id) => id === userId)
			let userDislike = sauce.usersDisliked.find((id) => id === userId)

			console.log('Statut : ', like)

			// Fonction like
			switch (like) {
				// +1 (like)
				case 1:
					sauce.likes += 1
					sauce.usersLiked.push(userId)
					break

				// Annule -1
				case 0:
					if (userLike) {
						sauce.likes -= 1
						sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId)
					}
					if (userDislike) {
						sauce.dislikes -= 1
						sauce.usersDisliked = sauce.usersDisliked.filter(
							(id) => id !== userId
						)
					}
					break

				// +1 (dislike)
				case -1:
					sauce.dislikes += 1
					sauce.usersDisliked.push(userId)
			}
			// Sauvegarde de la sauce avec .save
			sauce.save()
				.then(() => res.status(201).json({ message: 'Sauce sauvegardée' }))
				.catch((error) => res.status(400).json({ error }))
		})
		// Erreur server
		.catch((error) => res.status(500).json({ error }))
}