const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
//const Joi = require('joi');

exports.login=(req,res,next)=>{
	//espresso-validation library
	/*body: {
	    email: Joi.string().email().required(),
	    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
	  }
	*/
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('password', 'Password cannot be blank').notEmpty();
	req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

	const errors = req.validationErrors();

	if (errors) {
		return res.status(400).send({error: errors});
	}

	next();
}

exports.signup=(req,res,next)=>{
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('password', 'Password must be at least 4 characters long').len(4);
	req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
	req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

	const errors = req.validationErrors();

	if (errors) {
		return res.status(400).send({error: errors});
	}

	next();
}

exports.email=(req,res,next)=>{
	req.assert('email', 'Please enter a valid email address.').isEmail();
	req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

	const errors = req.validationErrors();

	if (errors) {
		return res.status(400).send({error: errors});
	}

	next();
}

exports.password=(req,res,next)=>{
	req.assert('password', 'Password must be at least 4 characters long').len(4);
	req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		return res.status(400).send({error: errors});
	}

	next();
}