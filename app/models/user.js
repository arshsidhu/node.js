//User model

//Load things we need
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

//Define user schema
var userSchema = mongoose.Schema({
	local:{
		email:String,
		password:String,
	},
	facebook:{
		id:String,
		token:String,
		name:String,
		email:String,
	},
	twitter:{
		id:String,
		token:String,
		name:String,
		email:String,
	}
});

//Methods
//Gen a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

//create model for users and send to app
module.exports = mongoose.model('User', userSchema);