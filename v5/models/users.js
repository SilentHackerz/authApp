var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

//create a schema.

var userSchema = new Schema({
	email: {
		type: String,
		require: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		require: true
	}
});

userSchema.pre('save', async function(next){
	try{
	var salt = await bcrypt.genSalt(10);
	var bcrypthash = await bcrypt.hash(this.password, salt);
	//Re-assign hash version over original password
	this.password = bcrypthash;
	next();
	// console.log(salt);
	// console.log(this.password);
	// console.log(bcrypthash);
} catch(error){
	next(error);
}
});

userSchema.methods.isValidPassword = async function(newPassword){
	try{
		return await bcrypt.compare(newPassword, this.password);
	}catch(error){
		throw new Error(error);
	}
}
//create a model

var User = mongoose.model('User', userSchema);

//Export the model

module.exports = User;