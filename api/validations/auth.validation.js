const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
const Joi = require('joi');

module.exports={
	login:{
		body: {
		    email: Joi.string().email().required(),
		    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
	 	}
	},

	signup:{
		body: {
		    email: Joi.string().email().required(),
		    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
		    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
	 	}
	},

	email:{
		body: {
		    email: Joi.string().email().required()
	 	}
	},

	password:{
		body: {
		    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
	 	}
	}
}
