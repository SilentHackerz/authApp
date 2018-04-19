var passport = require('passport');
var JWTStrategt = require('passport-jwt').Strategy;
var { ExtractJwt } = require('passport-jwt');
var localStartegy = require('passport-local');
var User = require('./models/users');

//Json web token strategy

passport.use(new JWTStrategt({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: 'mynameisImad'
}, async (payload, done) => {
	try{
		
		//find the user specified in token
		var user = await User.findById(payload.sub);
		
		// If user not exist, handle it
		if (!user){
			return done(null, false);
		}
		
		// Otherwise, return the user
		done(null, user);

	}catch(error){
		done(error, false);
	}
}));

//Local Strategy

passport.use(new localStartegy({
	usernameField: 'email'
}, async (email, password, done) => {
	//find the user given by the email
	try {
		var user = await User.findOne({ email });
		// If not found user
		if(!user){
			return done(null, false);
		}
		//check password is correct
		var isMatch = await user.isValidPassword(password);
		
		//If not, handle it

		if(!isMatch){
			return done(null, false);
		}

		//Otherwise return the user
		done(null,user);
	} catch(error){
		done(error, false);
	}
}));