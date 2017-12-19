const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
	number: String,
	paymentSystem: String,
	paymentSystemLogo: Buffer,
	amount: Number
});

cardSchema.pre('remove', function (next) {
	let card = this;
	card.model('User').update(
		{ },
		{ $pull: { cards: card._id } },
		{ multi: true },
		next);
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;