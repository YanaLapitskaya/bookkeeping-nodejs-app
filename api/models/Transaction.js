const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

//autoIncrement.initialize(mongoose.connection);

const transactionSchema = new Schema({
	title: String,
	amount: Number,
	type: String,
	date: { type: Date, default: Date.now },
	card: { type: Schema.Types.ObjectId, ref: 'Card' },
	check: String,
});

//transactionSchema.plugin(autoIncrement.plugin,'Transaction');

transactionSchema.pre('remove', function (next) {
	let tran = this;
	tran.model('User').update(
		{ },
		{ $pull: { transactions: tran._id } },
		{ multi: true },
		next);
});

const Transaction = mongoose.model('Transaction', transactionSchema	);

module.exports = Transaction;