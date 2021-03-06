const Transaction = require('../models/Transaction');
const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * GET /all
 * Returns all transactions of the current user.
 */
exports.getTransactions = (req,res,next)=> {
	User.findById(req.user.id)
		.populate('transactions')
		.exec((err, user) => {
			if (err) return next(err);

			res.status(200).send({transactions: user.transactions});
		});
};

/**
 * GET /
 * Returns the transaction with id.
 */
exports.getTransaction = (req,res,next)=>{
	User.findById(req.user.id)
		.populate({path: 'transactions', match: {_id: req.params.id}})
		.exec((err, user) => {
			if (err) return next(err);

			res.status(200).send({transaction: user.transactions[0]});
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
		type: req.body.type,
	});
	if(req.body.card) trans.card = new mongoose.Types.ObjectId(req.body.card);

	trans.save(function (err) {
		if (err) return next(err);
	});

	User.findById(req.user.id, (err, user) => {
		if (err) { return next(err); }

		user.transactions.push(trans._id);
		user.save((err) => {
			if (err) return next(err);

			res.status(200).send({transaction: trans});
		});
	});
};

/**
 * POST /:id
 * Edit an existing transaction.
 */
exports.editTransaction = (req,res,next)=>{
	const check = req.file;

	Transaction.findById(req.params.id, (err, trans) => {
		if (err) return next(err);

		trans.title = req.body.title || '';
		trans.amount = Number(req.body.amount) || '';
		trans.type = req.body.type || '';

		if(req.body.card) trans.card = new mongoose.Types.ObjectId(req.body.card);
		if(check) trans.check = check.path;

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