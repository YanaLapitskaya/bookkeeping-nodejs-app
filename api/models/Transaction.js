const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Card = require('./Card.js');

autoIncrement.initialize(mongoose.connection);

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  date: { type: Date, default: Date.now },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  check: Buffer, 
  details: String
});

transactionSchema.plugin(autoIncrement.plugin,'Transaction');

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;