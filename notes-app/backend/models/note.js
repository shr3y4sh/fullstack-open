const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		minLength: 5
	},
	important: Boolean
});

noteSchema.set('toJSON', {
	transform: (doc, returned) => {
		returned.id = returned._id.toString();
		delete returned._id;
		delete returned.__v;
	}
});

module.exports = mongoose.model('note', noteSchema);
