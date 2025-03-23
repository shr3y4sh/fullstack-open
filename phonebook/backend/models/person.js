const mongoose = require('mongoose');

const DB_URL = process.env.DB_URI;

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

personSchema.set('toJSON', {
	transform: (doc, returned) => {
		returned.id = returned._id.toString();
		delete returned._id;
		delete returned.__v;
	}
});

mongoose.set('strictQuery', false);

mongoose
	.connect(DB_URL)
	.then(() => {
		console.log('Connected to mongodb');
	})
	.catch((err) => {
		console.log(err.message);
	});

const Person = mongoose.model('persons', personSchema);

module.exports = Person;
