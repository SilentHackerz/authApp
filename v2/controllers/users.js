var User = require('../models/User');
			
module.exports = {
	signUp: async (req, res, next) =>{
		console.log('You are at Signup');
		// var email = req.value.body.email;
		// var password = req.value.body.password;
		var {email, password} = req.value.body;
		var newUser = new User({email, password});
		await newUser.save();

		res.json({})
	},
	signIn: async (req, res, next) =>{
		console.log('You are at SignIp');
	},
	secret: async (req, res, next) =>{
		console.log('You are at secret');
	}

}