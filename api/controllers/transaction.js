const Transaction = require('../models/Transaction');
const User = require('../models/User');

/**
 * GET /all
 * Returns all transactions of the current user.
 */
exports.getTransactions = (req,res,next)=>{
	User.findById(req.user.id, (err, user) => {
		if (err) { return next(err); }

		return res.status(200).send({transactions: user.transactions});
	});
};


/**
 * GET /
 * Returns the transaction with id.
 */
exports.getTransaction = (req,res,next)=>{
	Transaction.findById(req.params.id, (err, trans) => {
		if (err) { return next(err); }

		return res.status(200).send({transaction: trans});
	});
};

/**
 * PUT /
 * Add new transaction.
 */
exports.addTransaction = (req,res,next)=>{
	const trans = new Transaction({
		title: req.body.title,
		amount: req.body.amount,
		type: req.body.type
	});

	trans.save((err)=>{
		if(err) {return next(err);}

		User.findById(req.user.id, (err, user) => {
			if (err) { return next(err); }

			user.transactions.push(trans);
			user.save((err) => {
				if (err) return next(err);
			});
		});
		return res.status(200).send({transaction: trans});
	});
};

/**
 * POST /:id
 * Edit an existing transaction.
 */
exports.editTransaction = (req,res,next)=>{
	Transaction.findById(req.params.id, (err, trans) => {
		if (err) { return next(err); }

		trans.title = req.body.title || '';
		trans.amount = req.body.amount || '';
		trans.type = req.body.type || '';
		//trans.card = req.body.card || '';
		//trans.check = req.body.check || '';
		trans.details = req.body.location || '';
		trans.save((err) => {
			if (err) return next(err);
			return res.status(200).send({ msg: 'Transaction has been updated.', transaction: trans });
		});
	});
};

/**
 * DELETE /:id
 * Delete an existing transaction.
 */
exports.deleteTransaction = (req,res,next)=>{
	Transaction.remove({ _id: req.params.id }, (err) => {
		if (err) { return next(err); }

		return res.status(200).send({ msg: 'The transaction has been deleted.'});
	});
};