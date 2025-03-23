const mongoose = require('mongoose');

const DB_URL = process.env.MONGODB_URI;

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
});

noteSchema.set('toJSON', {
	transform: (doc, returned) => {
		returned.id = returned._id.toString();
		delete returned._id;
		delete returned.__v;
	}
});

const Note = mongoose.model('note', noteSchema);

mongoose.set('strictQuery', false);

mongoose
	.connect(DB_URL)
	.then(() => {
		console.log('Connected to mongodb');
	})
	.catch((err) => {
		console.log(err.message);
	});

module.exports = Note;
