var JWT = require('jsonwebtoken');
var User = require('../models/users');

signToken = user => {
	return JWT.sign({
	iss: 'ImadAhmed',
	sub: user.id,
	iat: new Date().getTime(),
	exp: new Date().setDate(new Date().getDate() + 1) 
}, 'mynameisImad');
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
	res.status(200).json({token});
	},
	signIn: async (req, res, next) =>{
	// generate token
		console.log('You are at SignIp');
	},
	secret: async (req, res, next) =>{
		console.log('You are at secret');
		res.send('The is the secret page!!!')
	}

}