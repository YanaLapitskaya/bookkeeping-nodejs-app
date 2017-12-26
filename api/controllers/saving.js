const Saving = require('../models/Saving');
const User = require('../models/User');

/**
 * GET /all
 * Returns all transactions of the current user.
 */
exports.getSavings = (req,res,next)=> {
	User.findById(req.user.id)
		.populate('savings')
		.exec((err, user) => {
			if (err) return next(err);

			res.status(200).send({savings: user.savings});
		});
};

/**
 * GET /
 * Returns the transaction with id.
 */
exports.getSaving = (req,res,next)=>{
	User.findById(req.user.id)
		.populate({path: 'savings', match: {_id: req.params.id}})
		.exec((err, user) => {
			if (err) return next(err);

			res.status(200).send({savings: user.savings[0]});
		});
};

/**
 * PUT /
 * Add new transaction.
 */
exports.addSaving = (req,res,next)=>{
	const saving = new Saving({
		title: req.body.title,
		curAmount: req.body.curAmount,
		tarAmount: req.body.tarAmount,
	});

	saving.save(function (err) {
		if (err) return next(err);
	});

	User.findById(req.user.id, (err, user) => {
		if (err) { return next(err); }

		user.savings.push(saving._id);
		user.save((err) => {
			if (err) return next(err);

			res.status(200).send({saving: saving});
		});
	});
};

/**
 * POST /:id
 * Edit an existing card.
 */
exports.editSaving = (req,res,next)=>{
	Saving.findById(req.params.id, (err, saving) => {
		if (err) return next(err);

		if(req.body.title) saving.title= req.body.title;
		if(req.body.curAmount) saving.curAmount= req.body.curAmount;
		if(req.body.tarAmount) saving.tarAmount = req.body.tarAmount;

		saving.save((err) => {
			if (err) return next(err);

			return res.status(200).send({ msg: 'Saving has been updated.', saving: saving });
		});
	});
};

/**
 * DELETE /:id
 * Delete an existing transaction.
 */
exports.deleteSaving = (req,res,next)=>{
	Saving.remove({ _id: req.params.id }, (err) => {
		if (err) { return next(err); }

		return res.status(200).send({ msg: 'The saving has been deleted.'});
	});
};
