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
};
