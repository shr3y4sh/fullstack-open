import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	born: {
		type: Number
	},

	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'book'
		}
	]
});

const Author = mongoose.model('author', authorSchema);

export default Author;
