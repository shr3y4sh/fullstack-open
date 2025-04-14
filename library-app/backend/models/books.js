import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	published: {
		type: Number,
		required: true
	},
	genres: [
		{
			type: String
		}
	],
	author: {
		type: String,
		required: true
	}
});

const Book = mongoose.model('book', bookSchema);

export default Book;
