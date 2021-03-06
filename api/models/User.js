const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, unique: true },
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,

	transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
	cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
	savings: [{ type: Schema.Types.ObjectId, ref: 'Saving' }],

	name: String,
	gender: String,
	location: String,
	picture: String
}, { timestamps: true });

userSchema.pre('save', function save(next) {
	const user = this;
	if (!user.isModified('password')) { return next(); }
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) { return next(err); }
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
