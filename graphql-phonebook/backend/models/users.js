const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3
	},

	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'person'
		}
	]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
