const mongoose = require('mongoose');

const savingSchema = new mongoose.Schema({
	title: String,
	curAmount: Number,
	tarAmount: Number
});

const Saving = mongoose.model('Saving', savingSchema);

module.exports = Saving;