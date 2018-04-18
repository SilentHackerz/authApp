var JWT = require('jsonwebtoken');
var JWT_SECRET = ('../configuration');
var User = require('../models/users');

signToken = User => {
	return JWT.sign({
	iss: 'ImadAhmed',
	sub: User.id,
	iat: new Date().getTime(),
	exp: new Date().setDate(new Date().getDate() + 1) 
}, JWT_SECRET);
}
module.exports = {
	signUp: async (req, res, next) =>{
		var { email, password} = req.value.body;
	//Check if there is a user with same email
	var foundUser = await User.findOne({email});

	if(foundUser){
		return res.status(403).json({error: 'Email is already in use.'})
	}

	//Create a new user
	var newUser = new User({email, password});
	await newUser.save();
	// res.json({user: 'created'});
	//generate tocken
	var token = signToken(newUser);
	res.json({token});
	},
	signIn: async (req, res, next) =>{
	// generate token
		console.log('You are at SignIp');
	},
	secret: async (req, res, next) =>{
		console.log('You are at secret');
	}

}