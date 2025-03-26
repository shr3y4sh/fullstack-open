const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'note'
		}
	]
});

userSchema.set('toJSON', {
	transform: (doc, returned) => {
		(returned.id = returned._id.toString()),
			delete returned._id,
			delete returned.__v,
			delete returned.passwordHash;
	}
});

const User = mongoose.model('user', userSchema);

module.exports = User;
