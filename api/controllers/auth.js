const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

/**
 * POST /login
 * Sign in using email and password.
 */
exports.login = (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err) { return res.status(400).send({error: err}); }
		if (!user) {
			return res.status(400).send({error: 'User not found'});
		}
		req.logIn(user, (err) => {
			if (err) { return next(err); }
			return res.status(200).send({id: user._id, email: user.email});
		});
	})(req, res, next);

};
  
/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
	req.logout();
	res.status(200).send({message: 'User successfully logged out'});
};

/**
 * POST /signup
 * Create a new account.
 */
exports.signup = (req, res, next) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password
	});

	User.findOne({ email: req.body.email }, (err, existingUser) => {
		if (err) { return next(err); }
		if (existingUser) {
			return res.status(400).send({ msg: 'Account with that email address already exists.' });
		}
		user.save((err) => {
			if (err) { return next(err); }
			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}
				return res.status(200).send({id: user._id, email: user.email});
			});
		});
	});
};


/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.reset = (req, res, next) => {
	const resetPassword = () =>
		User
			.findOne({passwordResetToken: req.params.token })
			.where('passwordResetExpires').gt(Date.now())
			.then((user) => {
				if (!user) {
					return res.status(400).send({error:  'Password reset token is invalid or has expired.'});
				}
				user.password = req.body.password;
				user.passwordResetToken = null;
				user.passwordResetExpires = null;
				return user.save().then(() => new Promise((resolve, reject) => {
					req.logIn(user, (err) => {
						if (err) { return reject(err); }
						resolve(user);
					});
				}));

			});

	const sendResetPasswordEmail = (user) => {
		if (!user) { return; }
		const transporter = nodemailer.createTransport({
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			}
		});
		const mailOptions = {
			to: process.env.MAIL_USER,
			from: '',
			subject: 'Your Bookkeeping password has been changed',
			text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
		};
		return transporter.sendMail(mailOptions)
			.then(() => {
				return res.status(200).send({ msg: 'Success! Your password has been changed.' });
			});
	};

	resetPassword()
		.then(sendResetPasswordEmail)
		.catch(err => next(err));
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.forgot = (req, res, next) => {
	const createRandomToken = crypto
		.randomBytesAsync(16)
		.then(buf => buf.toString('hex'));

	const setRandomToken = token =>
		User
			.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					return res.status(400).send({error: 'Account with that email address does not exist.' });
				} else {
					user.passwordResetToken = token;
					user.passwordResetExpires = Date.now() + 3600000; // 1 hour
					user = user.save();
				}
				return user;
			});

	const sendForgotPasswordEmail = (user) => {
		if (!user) { return; }
		const token = user.passwordResetToken;
		const transporter = nodemailer.createTransport({
			service: process.env.MAIL_SERVICE,
			auth: {
				user:  process.env.MAIL_USER,
				pass:  process.env.MAIL_PASSWORD
			}
		});
		const mailOptions = {
			to: user.email,
			from: process.env.MAIL_USER,
			subject: 'Reset your password on Bookkeeping Service',
			text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
		};
		return transporter.sendMail(mailOptions)
			.then(() => {
				return res.status(200).send({token:  user.passwordResetToken});
			});
	};

	createRandomToken
		.then(setRandomToken)
		.then(sendForgotPasswordEmail)
		.catch(next);

};
