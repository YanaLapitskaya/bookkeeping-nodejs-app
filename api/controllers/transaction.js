const Transaction = require('../models/Transaction');

exports.addTransaction = (req,res,next)=>{
	const transaction = new Transaction({
		title: req.body.title,
		amount: req.body.amount,
		type: req.body.type
	});

	transaction.save((err)=>{
		if(err) {return next(err);}
		res.status(200).send({transaction: transaction});
	})
}

exports.getTransaction = (req,res,next)=>{

}