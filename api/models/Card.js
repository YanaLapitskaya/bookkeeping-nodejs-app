const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  number: String,
  paymentSystem: String,
  paymentSystemLogo: Buffer,
  amount: Number
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;