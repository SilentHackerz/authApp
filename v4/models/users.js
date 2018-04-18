var mongoose = require('mongoose');
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

//create a model

var User = mongoose.model('User', userSchema);

//Export the model

module.exports = User;