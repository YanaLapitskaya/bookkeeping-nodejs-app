const Card = require('../models/Card');
const User = require('../models/User');

/**
 * GET /all
 * Returns all cards of the current user.
 */
exports.getCards = (req,res,next)=> {
	User.findById(req.user.id)
		.populate('cards')
		.exec((err, user) => {
			if (err) return next(err);

			res.status(200).send({cards: user.cards});
		});
};

/**
 * GET /
 * Returns the card with id.
 */
exports.getCard = (req,res,next)=>{
	User.findById(req.user.id)
		.populate({path: 'cards', match: {_id: req.params.id}})
		.exec((err, user) => {
			if (err) return next(err);

			res.status(200).send({card: user.cards[0]});
		});
};

/**
 * PUT /
 * Add a new card.
 */
exports.addCard = (req,res,next)=>{
	const card = new Card({
		number: req.body.number,
		paymentSystem: req.body.paymentSystem,
		amount: req.body.amount
	});

	card.save(function (err) {
		if (err) return next(err);
	});

	User.findById(req.user.id, (err, user) => {
		if (err) { return next(err); }

		user.cards.push(card._id);
		user.save((err) => {
			if (err) return next(err);

			res.status(200).send({card: card});
		});
	});
};

/**
 * POST /:id
 * Edit an existing card.
 */
exports.editCard = (req,res,next)=>{
	Card.findById(req.params.id, (err, card) => {
		if (err) return next(err);

		if(req.body.number) card.number = req.body.number;
		if(req.body.paymentSystem) card.paymentSystem = req.body.paymentSystem;
		if(req.body.amount) card.amount = req.body.amount;

		card.save((err) => {
			if (err) return next(err);

			return res.status(200).send({ msg: 'Card has been updated.', card: card });
		});
	});
};

/**
 * DELETE /:id
 * Delete an existing transaction.
 */
exports.deleteCard = (req,res,next)=>{
	Card.remove({ _id: req.params.id }, (err) => {
		if (err) { return next(err); }

		return res.status(200).send({ msg: 'The card has been deleted.'});
	});
};