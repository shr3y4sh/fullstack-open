const mongoose = require('mongoose');

const DB_URL = process.env.DB_URI;

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
		validate: {
			validator: (value) =>
				Promise.resolve(/\d{2,3}-\d{2,3}-\d{2,}/.test(value))
		}
	}
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
