const User = require('../models/User');

/**
 * POST /account/profile
 * Update profile information.
 */
exports.updateProfile = (req, res, next) => {
	User.findById(req.user.id, (err, user) => {
		if (err) { return next(err); }
		user.email = req.body.email || '';
		user.name = req.body.name || '';
		user.gender = req.body.gender || '';
		user.location = req.body.location || '';
		user.save((err) => {
			if (err) {
				if (err.code === 11000) {
					return res.status(400).send({ msg: 'The email address you have entered is already associated with an account.' });
				}
				return next(err);
			}
			return res.status(200).send({ msg: 'Profile information has been updated.' });
		});
	});
};

/**
 * POST /account/password
 * Update current password.
 */
exports.updatePassword = (req, res, next) => {
	User.findById(req.user.id, (err, user) => {
		if (err) { return next(err); }
		user.password = req.body.password;
		user.save((err) => {
			if (err) { return next(err); }
			return res.status(200).send({msg: 'Password has been changed.'});
		});
	});
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.deleteAccount = (req, res, next) => {
	User.remove({ _id: req.user.id }, (err) => {
		if (err) { return next(err); }
		req.logout();
		return res.status(200).send({ msg: 'Your account has been deleted.'});
	});
};